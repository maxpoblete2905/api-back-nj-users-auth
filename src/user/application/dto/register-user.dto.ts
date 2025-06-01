// src/application/dto/register-user.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/user/domain/model/gender.model';

export class RegisterUserDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  passwordHash!: string; // Nota: En DTO se llama password, pero se renombra en el servicio

  @IsOptional()
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(150)
  age: number;

  @IsOptional()
  @Type(() => Number)
  genderId: Gender;

  @IsOptional()
  @IsString()
  profilePictureUrl: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  rut: string;

  @IsOptional()
  @IsString()
  cedulaNumber: string;
}
