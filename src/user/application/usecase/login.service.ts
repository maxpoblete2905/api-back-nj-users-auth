// src/application/usecase/login.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      this.logger.log(`Attempting login for user: ${email}`);

      const user = await this.userRepository.findByEmail(email);
      this.logger.debug(`User found: ${JSON.stringify(user)}`);

      if (!user) {
        this.logger.warn(`Login failed - User not found: ${email}`);
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      console.log(password);
      console.log(user.passwordHash);
      if (!passwordValid) {
        this.logger.warn(`Login failed - Invalid password for user: ${email}`);
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      // Update lastAccess date
      user.lastAccess = new Date();
      await this.userRepository.updateUser(user);
      this.logger.debug(`Last access updated for user: ${user.userId}`);

      // Create JWT payload
      const payload = { sub: user.userId, email: user.email };
      const accessToken = this.jwtService.sign(payload);

      this.logger.log(`Login successful for user: ${email}`);
      return { accessToken };
    } catch (error) {
      this.logger.error(
        `Login error for user ${email}: ${error.message}`,
        error.stack,
      );

      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Error during authentication');
    }
  }
}
