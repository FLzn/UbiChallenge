// region nest
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// endregion

// region 3rd
import { compareSync } from 'bcrypt';
// endregion

// region users
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
// endregion

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userEmail: string, userPassword: string): Promise<any> {
      
      const user = await this.usersService.getUserByEmail(userEmail);
      const passwordIsValid = compareSync(userPassword, user.password);

      if (user && passwordIsValid) {
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