import {
  Column,
  Entity,
  PrimaryColumn
} from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn({
    name: 'in_id',
    nullable: false,
    type: 'integer',
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
    name: 'bl_admin',
    nullable: false,
    type: 'boolean',
  })
  admin: boolean;

}