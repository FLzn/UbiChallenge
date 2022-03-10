import { Users } from "src/users/entities/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn
} from "typeorm";

@Entity()
export class Todo {
  @PrimaryColumn({
    name: 'in_id',
    nullable: false,
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'st_status',
    nullable: false,
    type: "varchar",
    length: 100
  })
  status: string;

  @Column({
    name: 'st_descricao',
    nullable: true,
    type: 'varchar',
    length: 255
  })
  descricao: string;

  @Column({
    name: 'createdAt',
    nullable: true,
    type: 'timestamp'
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    nullable: true,
    type: 'timestamp'
  })
  updatedAt: Date;

  @Column({
    name: 'finalizedAt',
    nullable: true,
    type: 'timestamp'
  })
  finalizedAt: Date;

  @Column({
    name: 'dt_prazo',
    nullable: true,
    type: 'timestamp'
  })
  prazo: string;

  @OneToOne(() => Users)
  @JoinColumn()
  users: Users;

}