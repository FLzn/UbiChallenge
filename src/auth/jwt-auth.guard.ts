// region nest
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//endregion

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}