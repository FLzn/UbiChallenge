// region nest
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
// endregion

// region users
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
// endregion

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async getUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  // @Get('/:id')
  // async getUser(@Param('id') id: number): Promise<Users | string> {
  //   return this.usersService.getUser(id);
  // }

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  async createUser(@Body() body: Users) {
    await this.usersService.createUser(body);
  }



}
