// src/application/usecase/update-location.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class UpdateLocationService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateLocation(
    userId: number,
    latitude: number,
    longitude: number,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.userRepository.updateUserLocation(userId, latitude, longitude);
  }
}
