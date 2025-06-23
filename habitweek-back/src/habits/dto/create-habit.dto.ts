import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNotEmpty()
  frequency: string[];
}