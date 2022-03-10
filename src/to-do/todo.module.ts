import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo])
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
