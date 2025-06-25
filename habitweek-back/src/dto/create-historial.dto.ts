import { IsBoolean, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHistorialDto {
  @IsUUID()
  @IsNotEmpty()
  habitoId: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string; // formato ISO: "2025-06-23"

  @IsBoolean()
  completado: boolean;
}
