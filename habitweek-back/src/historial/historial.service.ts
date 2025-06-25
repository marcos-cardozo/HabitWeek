import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistorialDto } from 'src/dto/create-historial.dto';

@Injectable()
export class HistorialService {
  constructor(private prisma: PrismaService) {}

  async marcar(dto: CreateHistorialDto, userId: string) {
    // Verificamos que el hábito sea del usuario
    const habito = await this.prisma.habito.findFirst({
      where: { id: dto.habitoId, usuarioId: userId },
    });

    if (!habito) {
      throw new NotFoundException('Hábito no encontrado o no pertenece al usuario');
    }

    // Upsert: si ya existe un registro para esa fecha, lo actualiza
    return this.prisma.historial.upsert({
      where: {
        habitoId_fecha: {
          habitoId: dto.habitoId,
          fecha: new Date(dto.fecha),
        },
      },
      update: {
        completado: dto.completado,
      },
      create: {
        habitoId: dto.habitoId,
        fecha: new Date(dto.fecha),
        completado: dto.completado,
      },
    });
  }

  async obtenerHistorialDeHabito(habitoId: string, userId: string) {
    // Validamos que el hábito sea del usuario
    const habito = await this.prisma.habito.findFirst({
      where: { id: habitoId, usuarioId: userId },
    });

    if (!habito) {
      throw new NotFoundException('Hábito no encontrado');
    }

    return this.prisma.historial.findMany({
      where: { habitoId },
      orderBy: { fecha: 'desc' },
    });
  }

  async calcularRachaActual(habitoId: string, userId: string): Promise<number> {
    const habito = await this.prisma.habito.findFirst({
      where: { id: habitoId, usuarioId: userId },
    });
    if (!habito) throw new NotFoundException('Hábito no encontrado');

    const historial = await this.prisma.historial.findMany({
      where: { habitoId },
      orderBy: { fecha: 'desc' },
    });

    let racha = 0;
    let fechaPrev = new Date();

    for (const registro of historial) {
      const diff = (fechaPrev.getTime() - registro.fecha.getTime()) / (1000 * 60 * 60 * 24);
      if (diff > 1) break; // hubo un día sin registro consecutivo

      if (registro.completado) {
        racha++;
        fechaPrev = new Date(registro.fecha);
        fechaPrev.setDate(fechaPrev.getDate() - 1);
      } else {
        break;
      }
    }
    return racha;
  }

  async calcularPorcentajeCumplimiento(
    habitoId: string,
    userId: string,
    desde: Date,
    hasta: Date,
  ): Promise<number> {
    const habito = await this.prisma.habito.findFirst({
      where: { id: habitoId, usuarioId: userId },
    });
    if (!habito) throw new NotFoundException('Hábito no encontrado');

    // Obtener historial en rango
    const historial = await this.prisma.historial.findMany({
      where: {
        habitoId,
        fecha: {
          gte: desde,
          lte: hasta,
        },
      },
    });
    const diffMs = hasta.getTime() - desde.getTime();
    const diasTotales = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

    // Dias completados
    const diasCompletados = historial.filter((h) => h.completado).length;

    return (diasCompletados / diasTotales) * 100;
  }
}
