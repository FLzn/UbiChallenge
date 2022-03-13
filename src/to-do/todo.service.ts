import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash'
import { validateTodo } from 'src/validations/todo';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { AuthService } from 'src/auth/auth.service';
import { isAfter, getDate } from '../utils/getDate'
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoModel: Repository<Todo>,
    private authService: AuthService,
    private userService: UsersService,
  ) { }

  // teste paginate
  async paginate(options: IPaginationOptions): Promise<Pagination<Todo>> {
    const qb = this.todoModel.createQueryBuilder('t');
    qb.orderBy('t.id', 'DESC');

    return paginate<Todo>(this.todoModel, options);
  }

  async getTodosAtrasados(options: IPaginationOptions, headers): Promise<Pagination<Todo>> {
    const objUser: any = this.authService.getUserIdInsideJwt(headers.authorization);
    const userId = objUser.id;
    const queryBuilder = this.todoModel.createQueryBuilder('t');
    queryBuilder.select(['t.title', 't.description', 't.deadline', 'users.email']);
    queryBuilder.innerJoin("t.user", "users")
    queryBuilder.where({
      userId: userId,
      status: "Atrasado"
    });
    queryBuilder.orderBy('t.deadline', 'ASC');
    return paginate<Todo>(queryBuilder, options);
  }

  // rota para o admin pegar todos os TODOS
  async getTodo(options: IPaginationOptions): Promise<Pagination<Todo>> {
    const queryBuilder = this.todoModel.createQueryBuilder('t');
    queryBuilder.select(['t.title', 't.description', 't.deadline', 'users.email']);
    queryBuilder.innerJoin("t.user", "users")
    queryBuilder.orderBy('t.deadline', 'ASC');
    return paginate<Todo>(queryBuilder, options);
  }

  // rota para criar todo
  async createTodo(todoRequest: any, headers) {
    try {
      const newTodoValidation = await validateTodo(todoRequest, this.todoModel);

      if (!newTodoValidation.ok) {
        const mainError = newTodoValidation.error;
        throw new Error(get(newTodoValidation, `errors.${mainError}`));
      }

      // date js
      const newDeadline: string = getDate(todoRequest.deadline);
      // const createdAt: string = getDate();

      const createdAt = new Date();

      // const jwt: any = this.authService.getJwt(token);
      const userId = this.authService.getUserIdInsideJwt(headers.authorization);

      todoRequest.createdAt = createdAt.toISOString();
      todoRequest.updatedAt = createdAt.toISOString();
      todoRequest.userId = userId;
      todoRequest.deadline = newDeadline;

      // conferir se o prazo não está atrasado
      // Compare data params (dataAtual, prazo)
      const comparison = isAfter(createdAt, todoRequest.deadline);
      if (comparison) {
        todoRequest.status = 'Atrasado';
      } else if (todoRequest !== 'Finalizado') {
        todoRequest.status = 'Aberto';
      }

      await this.todoModel.save(todoRequest);
      todoRequest.message = 'Tarefa criada com sucesso!'
      return todoRequest;
    } catch (err) {
      return err.message;
    }
  }

  // rota para dar update no TODO
  async updateTodo(todoUpdateRequest, id, userId) {
    try {
      const newTodoValidation = await validateTodo(todoUpdateRequest, this.todoModel);
      if (!newTodoValidation.ok) {
        const mainError = newTodoValidation.error;
        throw new Error && new (get(newTodoValidation, `errors.${mainError}`));
      }

      const oldTodo = await this.todoModel.findOne({
        where: {
          id: id,
          userId: userId,
        }
      });

      if (!oldTodo) {
        throw new HttpException('Você não tem permissão para alterar essa tarefa!', HttpStatus.FORBIDDEN);
      } else if (oldTodo.status === 'Finalizado') {
        throw new HttpException('A tarefa já foi concluída!', HttpStatus.ACCEPTED);
      }

      const now = new Date();

      // verificar se o prazo está atrasado e se o status da tarefa mudar para finalizado, preencher o status
      if (todoUpdateRequest.status === 'Finalizado') {
        todoUpdateRequest.finalizedAt = now.toISOString();
      }

      const comparison = isAfter(now, todoUpdateRequest.deadline);
      if (comparison && todoUpdateRequest.status !== 'Finalizado') {
        todoUpdateRequest.status = 'Atrasado';
      }
      todoUpdateRequest.updatedAt = now.toISOString();

      await this.todoModel.createQueryBuilder()
        .update(Todo)
        .set({
          status: todoUpdateRequest.status,
          title: todoUpdateRequest.title,
          description: todoUpdateRequest.description,
          updatedAt: todoUpdateRequest.updatedAt,
          finalizedAt: todoUpdateRequest.finalizedAt,
          deadline: todoUpdateRequest.deadline
        })
        .where({
          id: id,
          userId: userId
        })
        .execute()
      return 'Tarefa alterada com sucesso!';
    } catch (err) {
      return err.message;
    }
  }

  // rota para o usuário conseguir ver apenas as suas tasks
  async getUserTodos(headerAuth) {
    const idUser = this.authService.getUserIdInsideJwt(headerAuth);
    return await this.todoModel.find({
      where: {
        userId: idUser
      }
    });
  }

}
