import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { HabitosService } from './habitos.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateHabitoDto } from 'src/auth/dto/update-habito.dto';
import { CreateHabitoDto } from 'src/auth/dto/create-habito.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('habitos')
export class HabitosController {
  constructor(private readonly habitosService: HabitosService) {}

  @Post()
  crear(@Request() req, @Body() dto: CreateHabitoDto) {
    return this.habitosService.crear(req.user.userId, dto);
  }

  @Get()
  obtenerTodos(@Request() req) {
    return this.habitosService.obtenerTodos(req.user.userId);
  }

  @Get(':id')
  obtenerUno(@Request() req, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.habitosService.obtenerUno(id, req.user.userId);
  }

  @Patch(':id')
  actualizar(@Request() req, @Param('id') id: string, @Body() dto: UpdateHabitoDto) {
    return this.habitosService.actualizar(id, req.user.userId, dto);
  }

  @Delete(':id')
  eliminar(@Request() req, @Param('id') id: string) {
    return this.habitosService.eliminar(id, req.user.userId);
  }
}
