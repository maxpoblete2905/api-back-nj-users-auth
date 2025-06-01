// src/application/usecase/register-user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/model/user.model';
import * as bcrypt from 'bcrypt';
import { Gender } from '../../domain/model/gender.model';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class RegisterUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userData: RegisterUserDto): Promise<User> {
    if (!userData.email) throw new BadRequestException('Email es obligatorio');
    if (!userData.passwordHash)
      throw new BadRequestException('Password es obligatorio');

    const exists = await this.userRepository.findByEmail(userData.email);
    if (exists) throw new BadRequestException('Email ya registrado');

    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);

    const user = new User();
    user.email = userData.email;
    user.passwordHash = hashedPassword;
    user.name = userData.name ?? null;
    user.age = userData.age ?? null;
    user.gender = userData.genderId ?? new Gender();
    user.profilePictureUrl = userData.profilePictureUrl ?? null;
    user.description = userData.description ?? null;
    user.rut = userData.rut ?? null;
    user.cedulaNumber = userData.cedulaNumber ?? null;

    return this.userRepository.createUser(user);
  }
}
