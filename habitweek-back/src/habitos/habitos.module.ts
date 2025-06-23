import { Module } from '@nestjs/common';
import { HabitosController } from './habitos.controller';
import { HabitosService } from './habitos.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HabitosController],
  providers: [HabitosService],
})
export class HabitosModule {}
