// region modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// endregion

// region users
import { Users } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// endregion

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
