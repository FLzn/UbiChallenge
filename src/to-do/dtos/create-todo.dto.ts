import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmpty, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class CreateTodoDto {
  @IsEmpty()
  id: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  createdAt?: string;

  @IsDateString()
  updatedAt?: string;

  @IsDateString()
  finalizedAt?: string;

  @ApiProperty()
  @IsDateString()
  deadline: string;

  @IsNumberString()
  user: number;
}