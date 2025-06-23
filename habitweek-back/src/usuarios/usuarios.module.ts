import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 👈 agregalo acá
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
