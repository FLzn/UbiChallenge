// region nest
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
// endregion

// auth
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
// endregion

// todo
import CreateTodoDto from './dtos/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
// endregion

// pagination
import { Pagination } from 'nestjs-typeorm-paginate';
// endregion

@Controller('todo')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
  ) { }

  // Rota para pegar atrasados -> PAGINADO
  @Get('/atrasados')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getTodosAtrasados(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<Pagination<Todo>> {
    return this.todoService.getTodosAtrasados({
      page,
      limit
    });
  }

  // ROTA TODOS OS TODOS -> PAGINADO
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getTodo(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Todo>> {
    return this.todoService.getTodo({
      page,
      limit
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() body: Partial<CreateTodoDto>, @Headers() headers) {
    return await this.todoService.createTodo(body, headers);
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Param('id') id: number, @Body() body, @Headers() headers) {
    const userId = this.authService.getUserIdInsideJwt(headers.authorization);
    return await this.todoService.updateTodo(body, id, userId);
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  async getUserTodos(@Headers() headers) {
    return await this.todoService.getUserTodos(headers.authorization);
  }

}
