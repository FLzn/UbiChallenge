// region nest
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// endregion

//region typeorm
import { Repository } from 'typeorm';
// endregion

// region users
import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from './entities/users.entity';
// endregion

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersModel: Repository<Users>
  ) {}

  async getAllUsers() {
    try {
      const users = await this.usersModel.find();
      return users ? users : 'Usuários não encontrados!';
    } catch (error) {
      return error
    }
  }

  async getUser(id: number) {
    try {
      const user = await this.usersModel.findOne(
        {
          where: {
            id: id
          }
        }
      );
      return user ? user : 'Usuário não encontrado!';
    } catch(error) {
      return error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersModel.findOne(
        {
          where: {
            email: email
          }
        }
      );
      return user ? user : 'Usuário não encontrado!';
    } catch(error) {
      return error;
    }
  }


  async createUser(userRequest: CreateUserDto) {
    try {
      // Fazer validate de user
      await this.usersModel.save(userRequest);
    } catch (error) {
      return error;
    }
  }

}
