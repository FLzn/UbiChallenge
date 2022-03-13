import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo]),
        AuthModule,
        UsersModule
    ],
    controllers: [
        TodoController
    ],
    providers: [
        TodoService
    ],
    exports: [
        TodoService
    ]
})
export class TodoModule { }
