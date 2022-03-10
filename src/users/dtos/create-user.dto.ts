import {
  IsBoolean,
  IsEmail, 
  IsString
} from "class-validator";

export class CreateUserDto {
  // @IsNumber()
  // id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  admin?: boolean;

}