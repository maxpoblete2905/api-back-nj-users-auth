// src/infrastructure/repository/gender.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../../domain/model/gender.model';
import { GenderRepository } from '../../domain/ports/gender.repository';

@Injectable()
export class GenderTypeORMRepository implements GenderRepository {
  constructor(
    @InjectRepository(Gender)
    private readonly repository: Repository<Gender>,
  ) {}

  async findById(id: number): Promise<Gender | null> {
    return this.repository.findOneBy({ genderId: id });
  }
}
