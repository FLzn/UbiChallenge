import { IsDateString, IsEmpty, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class CreateTodoDto {
  @IsEmpty()
  id: number;
  
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  createdAt?: string;

  @IsDateString()
  updatedAt?: string;

  @IsDateString()
  finalizedAt?: string;

  @IsDateString()
  deadline: string;

  @IsNumberString()
  user: number;
}