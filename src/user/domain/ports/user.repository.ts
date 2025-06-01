// src/domain/ports/user.repository.ts
import { User } from '../model/user.model';
import { UserLocation } from '../model/user-location.model';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(userId: number): Promise<User | null>;
  abstract createUser(user: User): Promise<User>;
  abstract updateUser(user: User): Promise<User>;
  abstract deleteUser(userId: number): Promise<void>;
  abstract findFiltered(
    startDate?: Date,
    endDate?: Date,
    email?: string,
    name?: string,
    rut?: string,
  ): Promise<User[]>;
  abstract updateUserLocation(
    userId: number,
    latitude: number,
    longitude: number,
  ): Promise<void>;
  abstract findUserLocation(userId: number): Promise<UserLocation | null>;
}
