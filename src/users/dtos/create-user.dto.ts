import { ApiProperty } from "@nestjs/swagger";
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role?: Role;

}