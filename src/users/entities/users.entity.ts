import { Role } from "src/enums/role.enum";
import {
  Column,
  Entity,
  PrimaryColumn
} from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn({
    name: 'in_id_user',
    nullable: false,
    type: 'int',
  })
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

}