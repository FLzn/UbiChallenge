import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'lodash'
import { validateTodo } from 'src/validations/todo';
import { Repository } from 'typeorm';
import CreateTodoDto from './dtos/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { AuthService } from 'src/auth/auth.service';
import { isAfter, getDate } from '../utils/getDate'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoModel: Repository<Todo>,
    private authService: AuthService
  ) { }

  async getTodo() {
    return await this.todoModel.find();
  }

  async createTodo(todoRequest: any, headers) {
    try {
      const newTodoValidation = await validateTodo(todoRequest, this.todoModel);

      if (!newTodoValidation.ok) {
        const mainError = newTodoValidation.error;
        throw new Error(get(newTodoValidation, `errors.${mainError}`));
      }

      // moment
      // moment.locale('pt-br');
      // const newDeadline: string = moment(todoRequest.deadline).format('LTS');
      // const createdAt: string = moment().format('DD/MM/YYYY HH:mm:ss');
      // fim moment

      // date js
      const newDeadline: string = getDate(todoRequest.deadline);
      const createdAt: string = getDate();

      const token: string = headers.authorization.split(' ')[1];
      const jwt: any = this.authService.getJwt(token);
      const userId: number = jwt.id;

      todoRequest.createdAt = createdAt;
      todoRequest.updatedAt = createdAt;
      todoRequest.userId = userId;
      todoRequest.deadline = newDeadline;

      // conferir se o prazo não está atrasado
      // Compare data params (dataAtual, prazo)
      const comparison = isAfter(createdAt,todoRequest.deadline);
      if (comparison) {
        todoRequest.status = 'Atrasado';
      } else if (todoRequest !== 'Finalizado') {
        todoRequest.status = 'Aberto';
      }

      await this.todoModel.save(todoRequest);
      // console.log(todoRequest)
      todoRequest.message = 'Tarefa criada com sucesso!'
      return todoRequest;
    } catch (err) {
      return err.message;
    }
  }

  async updateTodo(todoUpdateRequest, id, userId) {
    try {
      console.log('UserId: ',userId)
      const newTodoValidation = await validateTodo(todoUpdateRequest, this.todoModel);

      if (!newTodoValidation.ok) {
        const mainError = newTodoValidation.error;
        throw new Error && new(get(newTodoValidation, `errors.${mainError}`));
      }

      const oldTodo = await this.todoModel.findOne({
        where: {
          id: id,
          userId: userId,
        }
      });
    
      if (!oldTodo) {
        throw new HttpException('Você não tem permissão para alterar essa tarefa!', HttpStatus.FORBIDDEN);
      }

      // verificar se o prazo está atrasado e se o status da tarefa mudar para finalizado, preencher o status
      if (todoUpdateRequest.status === 'Finalizado') {
        todoUpdateRequest.finalizedAt = getDate();
      }
      
      const now = new Date();
      const comparison = isAfter(now, todoUpdateRequest.deadline);
      console.log(comparison);
      if (comparison && todoUpdateRequest.status !== 'Finalizado') {
        todoUpdateRequest.status = 'Atrasado';
      } else if (todoUpdateRequest !== 'Finalizado' && oldTodo.status !== 'Finalizado') {
        todoUpdateRequest.status = 'Aberto';
      }      

      todoUpdateRequest.updatedAt = getDate();

      console.log(todoUpdateRequest);
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



}
