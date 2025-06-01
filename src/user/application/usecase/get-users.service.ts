// src/application/usecase/get-users.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/model/user.model';

@Injectable()
export class GetUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(
    startDate?: Date,
    endDate?: Date,
    email?: string,
    name?: string,
    rut?: string,
  ): Promise<User[]> {
    return this.userRepository.findFiltered(
      startDate,
      endDate,
      email,
      name,
      rut,
    );
  }
}
