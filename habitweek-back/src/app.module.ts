import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { HabitosModule } from './habitos/habitos.module';
import { HistorialModule } from './historial/historial.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, HabitosModule, HistorialModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaModule, AppService],
})
export class AppModule {}
