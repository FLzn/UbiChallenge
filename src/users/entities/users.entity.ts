import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn({
    name: 'id',
    nullable: false,
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    type: "varchar",
    length: 100
  })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    type: 'varchar',
    length: 100
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 100
  })
  password: string;

  @Column({
    name: 'admin',
    nullable: false,
    type: 'boolean',
  })
  admin: boolean;

}