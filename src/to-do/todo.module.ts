import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TodoController,],
    providers: [
        TodoService,],
})
export class TodoModule { }
