import { Controller, 
  Get, 
  Post,
  UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodo() {
    return this.todoService.getTodo();
  }

  @Post()
  async createTodo() {
    // await this.todoService.createTodo();
  }

}
