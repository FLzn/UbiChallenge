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
// endregion

// region auth
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/custom-decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
// endregion

// region users
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
// endregion

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<CreateUserDto[] | string> {
    return this.usersService.getAllUsers();
  }

  @Get('/:email')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  @UseInterceptors(FileInterceptor(''))
  async createUser(@Body() body: CreateUserDto): Promise<string> {
    return await this.usersService.createUser(body);
  }
}
