// region nest
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateUser } from 'src/validations/user';
// endregion

// region 3rd
import { get } from 'lodash';
import { genSalt, hash } from 'bcrypt'
// endregion

//region typeorm
import { Repository } from 'typeorm';
// endregion

// region users
import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from './entities/users.entity';
import UserErrorsDto from './dtos/user-errors.dtos';
// endregion

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersModel: Repository<Users>
  ) { }

  async getAllUsers(): Promise<CreateUserDto[] | string> {
    try {
      const users = await this.usersModel.find();
      if (users) return users;
      throw new HttpException('Usuários não encontrados!', HttpStatus.BAD_REQUEST);
    } catch (err) {
      throw new HttpException('Ocorreu um erro, tente novamente!', HttpStatus.BAD_REQUEST);
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
      if (user) return user;
      throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST);
    } catch (err) {
      return err;
    }
  }

  async createUser(userRequest: CreateUserDto) {
    try {
      const newUser: UserErrorsDto = await validateUser(userRequest, this.usersModel);
      if (newUser.ok) {
          const password = userRequest.password;
          const saltRounds = Number(process.env.SALT_ROUNDS);

          genSalt(saltRounds, (err, salt) => {
            hash(password, salt, (err, hash) => {
              userRequest.password = hash;
              this.usersModel.save(userRequest);
            })
          });
        } else {
          const mainError = newUser.error;
          throw new Error(get(newUser, `errors.${mainError}`));
        }
        return 'Usuário salvo com sucesso!';
    } catch (err) {
      return err.message;
    }
  }

}
