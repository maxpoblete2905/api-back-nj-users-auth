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
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from 'src/user/domain/enums/gender.enum';

export class RegisterUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del usuario',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Contraseña del usuario (se hasheará al guardar)',
    required: true,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  passwordHash!: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiProperty({
    example: 30,
    description: 'Edad del usuario',
    required: false,
    minimum: 0,
    maximum: 150,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(150)
  age?: number;

  @ApiProperty({
    enum: GenderEnum,
    example: GenderEnum.MALE,
    description: 'ID de género (debe existir en la base de datos)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  genderId?: number; // Usamos number porque es el tipo del ID en la entidad

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'URL de la foto de perfil',
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @ApiProperty({
    example: 'Desarrollador full-stack con 5 años de experiencia',
    description: 'Descripción o biografía del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiProperty({
    example: '12345678-9',
    description: 'RUT del usuario (formato chileno)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(8, 10)
  rut?: string;

  @ApiProperty({
    example: 'AB123456',
    description: 'Número de cédula o documento de identidad',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(4, 20)
  cedulaNumber?: string;
}
