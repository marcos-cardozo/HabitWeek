import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        contraseña: hashed,
      },
    });
    return this.generarToken(user);
  }

  async login(data: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    const valid = await bcrypt.compare(data.password, user?.contraseña || '');

    if (!user || !valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generarToken(user);
  }

  generarToken(user: Usuario): { access_token: string } {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
