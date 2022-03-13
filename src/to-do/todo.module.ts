// nest
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// endregion

// modules
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
// endregion

// todo
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
//

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
