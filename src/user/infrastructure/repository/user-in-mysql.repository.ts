// src/infrastructure/repository/user-in-mysql.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/model/user.model';
import { UserLocation } from '../../domain/model/user-location.model';

@Injectable()
export class UserInMysqlRepository implements UserRepository {
  private userRepo: Repository<User>;
  private locationRepo: Repository<UserLocation>;
  
  constructor(private dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User);
    this.locationRepo = dataSource.getRepository(UserLocation);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      relations: ['gender', 'location'],
    });
  }

  async findById(userId: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { userId },
      relations: ['gender', 'location'],
    });
  }

  async createUser(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepo.delete(userId);
  }

  async findFiltered(
    startDate?: Date,
    endDate?: Date,
    email?: string,
    name?: string,
    rut?: string,
  ): Promise<User[]> {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.gender', 'gender');

    if (startDate)
      qb.andWhere('user.registrationDate >= :startDate', { startDate });
    if (endDate) qb.andWhere('user.registrationDate <= :endDate', { endDate });
    if (email) qb.andWhere('user.email LIKE :email', { email: `%${email}%` });
    if (name) qb.andWhere('user.name LIKE :name', { name: `%${name}%` });
    if (rut) qb.andWhere('user.rut = :rut', { rut });

    return qb.getMany();
  }

  async updateUserLocation(
    userId: number,
    latitude: number,
    longitude: number,
  ): Promise<void> {
    const location = await this.locationRepo.findOne({
      where: { user: { userId } },
      relations: ['user'],
    });
    if (location) {
      location.latitude = latitude;
      location.longitude = longitude;
      await this.locationRepo.save(location);
    } else {
      const user = await this.userRepo.findOneBy({ userId });
      if (!user) throw new Error('Usuario no encontrado');
      const newLocation = this.locationRepo.create({
        user,
        latitude,
        longitude,
      });
      await this.locationRepo.save(newLocation);
    }
  }

  async findUserLocation(userId: number): Promise<UserLocation | null> {
    return this.locationRepo.findOne({
      where: { user: { userId } },
      relations: ['user'],
    });
  }
}
