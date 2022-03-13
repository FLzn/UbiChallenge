import { 
  Body, 
  Controller, 
  DefaultValuePipe, 
  Get, 
  Headers, 
  HttpException, 
  HttpStatus, 
  Param, 
  ParseIntPipe, 
  Post,
  Put,
  Query,
  Res,
  UseGuards} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import CreateTodoDto from './dtos/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
  ) { }

  // @ApiTags('todo')
  // @Get()
  // @ApiTags('todo')
  // @ApiQuery({ name: 'page', required: false, type: Number })
  // @ApiQuery({ name: 'limit', required: false, type: Number })
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  // ): Promise<Pagination<Todo>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.todoService.findAll({
  //     page,
  //     limit
  //   });
  // }


// Rota para pegar atrasados -> PAGINADO
  @Get('/atrasados')
  @ApiTags('todo')
  @ApiQuery({ name: 'page', required: false, type: Number})
  @ApiQuery({ name: 'limit', required: false, type: Number})
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async getTodosAtrasados(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Headers() headers
  ) : Promise<Pagination<Todo>> {
    return this.todoService.getTodosAtrasados({
      page,
      limit
    }, headers);
  }

  // ROTA TODOS OS TODOS -> PAGINADO
  @Get()
  @ApiTags('todo')
  @ApiQuery({ name: 'page', required: false, type: Number})
  @ApiQuery({ name: 'limit', required: false, type: Number})
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async getTodo(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) : Promise<Pagination<Todo>> {
    return this.todoService.getTodo({
      page,
      limit
    });
  }

  @Post()
  @ApiTags('todo')
  @ApiBody({ type: CreateTodoDto })
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() body: Partial<CreateTodoDto>, @Headers() headers) {
    return await this.todoService.createTodo(body, headers);
  }

  @Put('/update/:id') // se der errado mudar pra post
  @ApiTags('todo')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Param('id') id: number, @Body() body, @Headers() headers) {
    const userId = this.authService.getUserIdInsideJwt(headers.authorization);
    // console.log(userId)
    // console.log(id)
    return await this.todoService.updateTodo(body, id, userId);
  }

  @Get('/users')
  @ApiTags('todo')
  @UseGuards(JwtAuthGuard)
  async getUserTodos(@Headers() headers) {
    return await this.todoService.getUserTodos(headers.authorization);
  }

}
