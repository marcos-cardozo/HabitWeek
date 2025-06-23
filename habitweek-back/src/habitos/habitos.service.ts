import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitoDto } from 'src/auth/dto/create-habito.dto';
import { UpdateHabitoDto } from 'src/auth/dto/update-habito.dto';

@Injectable()
export class HabitosService {
  constructor(private prisma: PrismaService) {}

  crear(userId: string, data: CreateHabitoDto) {
    return this.prisma.habito.create({
      data: {
        ...data,
        usuarioId: userId,
      },
    });
  }

  obtenerTodos(userId: string) {
    return this.prisma.habito.findMany({
      where: { usuarioId: userId },
    });
  }

  obtenerUno(id: string, userId: string) {
    return this.prisma.habito.findFirst({
      where: {
        id,
        usuarioId: userId,
      },
    });
  }

  async actualizar(id: string, userId: string, data: UpdateHabitoDto) {
    const habito = await this.prisma.habito.findFirst({
      where: { id, usuarioId: userId },
    });

    if (!habito) {
      throw new NotFoundException('Hábito no encontrado');
    }

    return this.prisma.habito.update({
      where: { id },
      data,
    });
  }

  async eliminar(id: string, userId: string) {
    const habito = await this.prisma.habito.findFirst({
      where: { id, usuarioId: userId },
    });

    if (!habito) {
      throw new NotFoundException('Hábito no encontrado');
    }

    return this.prisma.habito.delete({
      where: { id },
    });
  }
}
