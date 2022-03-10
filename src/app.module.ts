import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'challenge-ubi',
      entities: [
        "src/entities/**/*.ts"
      ],
      synchronize: false,
      autoLoadEntities: true,
      logging: true
    }),
    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
