// src/application/usecase/delete-user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.userRepository.deleteUser(userId);
  }
}
