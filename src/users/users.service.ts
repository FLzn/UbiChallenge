import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private usersModel: Repository<Users>
  ) {}

  getHello() {
    console.log('Oi')
    return this.usersModel.find();
  }

}
