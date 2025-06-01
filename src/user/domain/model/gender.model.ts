// src/domain/model/gender.model.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.model';

@Entity({ name: 'Gender' })
export class Gender {
  @PrimaryGeneratedColumn({ name: 'gender_id' })
  genderId: number;

  @Column({ name: 'gender_name', unique: true, length: 20 })
  genderName: string;

  @OneToMany(() => User, (user) => user.gender)
  users: User[];
}
