// region nest
import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// endregion

// region auth
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
// endregion

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    // Define default values that 'passport' will understand
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  // Function called automatically by passport
  async validate(email: string, password: string): Promise<any> {

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}