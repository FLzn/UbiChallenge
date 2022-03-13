// region nest
import {
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// endregion

// region 3rd
import { get } from 'lodash'
import {
  IPaginationOptions,
  paginate,
  Pagination
} from 'nestjs-typeorm-paginate';
// endregion

// region others
import { validateTodo } from 'src/validations/todo';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { AuthService } from 'src/auth/auth.service';
import {
  isAfter,
  getDate
} from '../utils/getDate'
// endregion

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoModel: Repository<Todo>,
    private authService: AuthService,
  ) { }

  async getTodosAtrasados(options: IPaginationOptions): Promise<Pagination<Todo>> {
    try {
      const queryBuilder = this.todoModel.createQueryBuilder('t');
      queryBuilder.select(['t.title', 't.description', 't.deadline', 'users.email']);
      queryBuilder.innerJoin("t.user", "users");
      queryBuilder.where({
        status: "Atrasado"
      });
      queryBuilder.orderBy('t.deadline', 'ASC');
      return paginate<Todo>(queryBuilder, options);
    } catch (err) {
      return err.message;
    }
  }

  // rota para o admin pegar todos os TODOS
  async getTodo(options: IPaginationOptions): Promise<Pagination<Todo>> {
    try {
      const queryBuilder = this.todoModel.createQueryBuilder('t');
      queryBuilder.select(['t.title', 't.description', 't.deadline', 'users.email']);
      queryBuilder.innerJoin("t.user", "users");
      queryBuilder.orderBy('t.deadline', 'ASC');
      return paginate<Todo>(queryBuilder, options);
    } catch (err) {
      return err.message;
    }
  }

  // rota para criar todo
  async createTodo(todoRequest: any, headers) {
    try {
      const newTodoValidation = await validateTodo(todoRequest);

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

      const comparison = isAfter(createdAt, todoRequest.deadline);
      if (comparison && todoRequest.status !== 'Finalizado') {
        todoRequest.status = 'Atrasado';
      } else if (todoRequest.status !== 'Finalizado') {
        todoRequest.status = 'Aberto';
      }

      if (todoRequest.status === 'Finalizado') {
        todoRequest.finalizedAt = createdAt.toISOString();
      }

      await this.todoModel.save(todoRequest);
      todoRequest.message = 'Tarefa criada com sucesso!';
      return todoRequest;
    } catch (err) {
      return err.message;
    }
  }

  // rota para dar update no TODO
  async updateTodo(todoUpdateRequest, id, userId) {
    try {
      const newTodoValidation = await validateTodo(todoUpdateRequest);
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
        .execute();
      return 'Tarefa alterada com sucesso!';
    } catch (err) {
      return err.message;
    }
  }

  // rota para o usuário conseguir ver apenas as suas tasks
  async getUserTodos(headerAuth) {
    try {
      const idUser = this.authService.getUserIdInsideJwt(headerAuth);
      return await this.todoModel.find({
        where: {
          userId: idUser
        }
      });
    } catch (err) {
      return err.message;
    }
  }

}
