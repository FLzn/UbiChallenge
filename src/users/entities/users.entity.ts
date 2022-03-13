import { Role } from "src/enums/role.enum";
import { Todo } from "src/to-do/entities/todo.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'st_name',
    nullable: false,
    type: "varchar",
    length: 255
  })
  name: string;

  @Column({
    name: 'st_email',
    nullable: false,
    type: 'varchar',
    length: 255
  })
  email: string;

  @Column({
    name: 'st_password',
    nullable: false,
    type: 'varchar',
    length: 255
  })
  password: string;

  @Column({
    name: 'en_role',
    nullable: false,
    type: 'enum',
    enum: ['admin','user']
  })
  role: Role;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];
}