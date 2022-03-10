import { Controller, 
  Get, 
  Post} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
  ) { }

  @Get()
  async getTodo() {
    return this.todoService.getTodo();
  }

  @Post()
  async createTodo() {
    await this.todoService.createTodo();
  }

}
