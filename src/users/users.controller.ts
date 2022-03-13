// region nest
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from './dtos/create-user.dto';
// endregion

// region users
import { UsersService } from './users.service';
// endregion

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @ApiTags('admin/users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<CreateUserDto[] | string> {
    return this.usersService.getAllUsers();
  }

  // @Get('/:id')
  // async getUser(@Param('id') id: number): Promise<Users | string> {
  //   return this.usersService.getUser(id);
  // }

  @Get('/:email')
  @ApiTags('admin/users')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  @ApiTags('users')
  @UseInterceptors(FileInterceptor(''))
  async createUser(@Body() body: CreateUserDto): Promise<string> {
    return await this.usersService.createUser(body);
  }



}
