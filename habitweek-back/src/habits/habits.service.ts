import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit, Prisma } from '@prisma/client'; // Importa los tipos de Prisma

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {} // Añade `readonly`

  async create(
    userId: string,
    dto: CreateHabitDto,
  ): Promise<Habit> { // Tipo de retorno explícito
    return await this.prisma.habit.create({
      data: {
        ...dto,
        userId,
      } as Prisma.HabitCreateInput, // Tipo explícito para el input
    });
  }

  async findAll(
    userId: string,
    isPublic?: boolean,
  ): Promise<Habit[]> { // Tipo de retorno
    return this.prisma.habit.findMany({
      where: {
        OR: [
          { userId },
          ...(isPublic ? [{ isPublic: true }] : []),
        ],
      } as Prisma.HabitWhereInput, // Tipo explícito para el `where`
    });
  }

  async findOne(
    id: string,
    userId: string,
  ): Promise<Habit & { completions?: any[] }> { // Tipo extendido
    const habit = await this.prisma.habit.findUnique({
      where: { id, userId },
      include: { completions: true },
    } as Prisma.HabitFindUniqueArgs);

    if (!habit) throw new NotFoundException('Habit not found');
    return habit;
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateHabitDto,
  ): Promise<Habit> {
    await this.findOne(id, userId);
    return this.prisma.habit.update({
      where: { id, userId },
      data: dto as Prisma.HabitUpdateInput, // Tipo explícito
    });
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<Habit> {
    await this.findOne(id, userId);
    return this.prisma.habit.delete({
      where: { id, userId },
    });
  }
}