// region modules
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
// endregion

// region auth && strategies
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './consts';
import { JwtStrategy } from './strategies/jwt.strategy';
// endregion

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '3600s'
      }
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }
