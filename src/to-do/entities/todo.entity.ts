import { Status } from "src/enums/status.enum";
import { Users } from "src/users/entities/users.entity";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'en_status',
    nullable: false,
    type: 'enum',
    enum: ['Aberto','Finalizado', 'Atrasado']
  })
  status: Status;

  @Column({
    name: 'st_title',
    nullable: false,
    type: 'varchar',
    length: 100
  })
  title: string;

  @Column({
    name: 'st_description',
    nullable: true,
    type: 'varchar',
    length: 255
  })
  description: string;

  @Column({
    name: 'createdAt',
    nullable: true,
    type: 'timestamp'
  })
  createdAt: string;

  @Column({
    name: 'updatedAt',
    nullable: true,
    type: 'timestamp'
  })
  updatedAt: string;

  @Column({
    name: 'finalizedAt',
    nullable: true,
    type: 'timestamp'
  })
  finalizedAt: string;

  @Column({
    name: 'dt_deadline',
    nullable: true,
    type: 'timestamp'
  })
  deadline: string;

  @Column({
    name: 'userId',
    nullable: true,
    type: 'integer'
  })
  userId: number;

  @ManyToOne(() => Users, user => user.id)
  user: Users;

}