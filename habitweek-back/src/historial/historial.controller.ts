import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { AuthGuard } from '@nestjs/passport';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateHistorialDto } from 'src/auth/dto/create-historial.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  marcar(@Request() req, @Body() dto: CreateHistorialDto) {
    return this.historialService.marcar(dto, req.user.userId);
  }

  @Get(':habitoId')
  obtener(@Request() req, @Param('habitoId', new ParseUUIDPipe()) habitoId: string) {
    return this.historialService.obtenerHistorialDeHabito(habitoId, req.user.userId);
  }

  @Get('racha/:habitoId')
  calcularRacha(@Request() req, @Param('habitoId', new ParseUUIDPipe()) habitoId: string) {
    return this.historialService.calcularRachaActual(habitoId, req.user.userId);
  }

  @Get('porcentaje/:habitoId')
  calcularPorcentaje(
    @Request() req,
    @Param('habitoId', new ParseUUIDPipe()) habitoId: string,
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    const desdeDate = new Date(desde);
    const hastaDate = new Date(hasta);
    return this.historialService.calcularPorcentajeCumplimiento(
      habitoId,
      req.user.userId,
      desdeDate,
      hastaDate,
    );
  }
}
