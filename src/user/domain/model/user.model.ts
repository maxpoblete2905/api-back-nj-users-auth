// src/domain/model/user.model.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Gender } from './gender.model';
import { UserLocation } from './user-location.model';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @ManyToOne(() => Gender, (gender) => gender.users)
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @Column({ name: 'profile_picture_url', length: 255, nullable: true })
  profilePictureUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'registration_date',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationDate: Date;

  @Column({ name: 'last_access', type: 'datetime', nullable: true })
  lastAccess: Date;

  @Column({ length: 20, unique: true, nullable: true })
  rut: string;

  @Column({ name: 'cedula_number', length: 20, unique: true, nullable: true })
  cedulaNumber: string;

  @OneToOne(() => UserLocation, (location) => location.user, { cascade: true })
  location: UserLocation;
}
