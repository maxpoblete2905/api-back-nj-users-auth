// src/application/usecase/register-user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/model/user.model';
import { Gender } from '../../domain/model/gender.model';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { GenderRepository } from 'src/user/domain/ports/gender.repository';

@Injectable()
export class RegisterUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genderRepository: GenderRepository,
  ) {}

  async register(userData: RegisterUserDto): Promise<User> {
    // Validaciones básicas
    if (!userData.email) throw new BadRequestException('Email es obligatorio');
    if (!userData.passwordHash)
      throw new BadRequestException('Password es obligatorio');

    // Verificar si el email existe
    const exists = await this.userRepository.findByEmail(userData.email);
    if (exists) throw new BadRequestException('Email ya registrado');

    // Validar género si fue proporcionado
    let gender: Gender | undefined;
    if (userData.genderId) {
      const foundGender = await this.genderRepository.findById(
        userData.genderId,
      );
      gender = foundGender === null ? undefined : foundGender;
      if (!gender) {
        throw new BadRequestException('El género especificado no existe');
      }
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);

    // Crear usuario
    const user = new User();
    user.email = userData.email;
    user.passwordHash = hashedPassword;
    user.name = userData.name ?? '';
    user.age = userData.age ?? 0;
    if (gender) {
      user.gender = gender; // Asignamos la entidad Gender completa
    }
    user.profilePictureUrl = userData.profilePictureUrl ?? '';
    user.description = userData.description ?? '';
    user.rut = userData.rut ?? '';
    user.cedulaNumber = userData.cedulaNumber ?? '';

    return this.userRepository.createUser(user);
  }
}
