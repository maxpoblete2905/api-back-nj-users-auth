// src/application/usecase/update-user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/model/user.model';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async update(userId: number, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    Object.assign(user, userData);
    return this.userRepository.updateUser(user);
  }
}
