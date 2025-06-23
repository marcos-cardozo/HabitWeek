import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsInt()
  frecuencia: number; // entre 1 y 7

  @IsArray()
  @IsString({ each: true })
  dias: string[]; // ej: ['L', 'M', 'X']
}
