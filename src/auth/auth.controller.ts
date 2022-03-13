// region nest
import {
  Controller,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
// endregion

// region auth
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
// endregion

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user)
  }
}
