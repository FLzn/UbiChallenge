import {
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsString
} from "class-validator";
import { Role } from "src/enums/role.enum";
import { Users } from "../entities/users.entity";

export class CreateUserDto {
  // @IsNumber()
  // id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  role?: Role;

}