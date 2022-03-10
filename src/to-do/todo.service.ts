import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoModel: Repository<Todo>
  ){}

  async getTodo() {
    const todo = await this.todoModel.find();
    return todo;
  }

  async createTodo() {
    console.log('rota criar todo')
  }
}
