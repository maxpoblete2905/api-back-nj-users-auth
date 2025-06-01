// src/application/usecase/login.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('Usuario o contraseña incorrectos');

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid)
      throw new UnauthorizedException('Usuario o contraseña incorrectos');

    // Actualizar lastAccess fecha
    user.lastAccess = new Date();
    await this.userRepository.updateUser(user);

    // Crear payload para JWT
    const payload = { sub: user.userId, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
