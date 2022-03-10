import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
// import { AuthLoginDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userEmail: string, userPassword: string): Promise<any> {
      
      const user = await this.usersService.getUserByEmail(userEmail);
      // const passwordIsValid = compareSync(userPassword, user.password);

      if (user && user.password === userPassword) {
        const { password, ...result } = user;
        
        return result;
      }

      return null;

    }

    async login(user: Partial<CreateUserDto>) {
      
      const payload = user;

      // Set login id to payload
      // payload.idLogin = saveLoginDb.id;

      return {
        access_token: this.jwtService.sign(payload)
      }

    }
}