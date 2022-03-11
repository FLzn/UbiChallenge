import { 
  Body, 
  Controller, 
  Get, 
  Headers, 
  HttpException, 
  HttpStatus, 
  Param, 
  Post,
  Res,
  UseGuards} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(
    private readonly todoService: TodoService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get()
  async getTodo() {
    return this.todoService.getTodo();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() body, @Headers() headers) {
    return await this.todoService.createTodo(body, headers);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  async updateTodo(@Param('id') id: number, @Body() body, @Headers() headers) {
    const auth = headers.authorization.split(' ')[1];
    const jwt: any = this.authService.getJwt(auth);
    const userId: number = jwt.id;
    // console.log(userId)
    // console.log(id)
    return await this.todoService.updateTodo(body, id, userId);
  }

}
