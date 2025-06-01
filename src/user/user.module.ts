// src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/model/user.model';
import { Gender } from './domain/model/gender.model';
import { UserLocation } from './domain/model/user-location.model';
import { UserInMysqlRepository } from './infrastructure/repository/user-in-mysql.repository';
import { UserRepository } from './domain/ports/user.repository';
import { LoginService } from './application/usecase/login.service';
import { RegisterUserService } from './application/usecase/register-user.service';
import { UpdateUserService } from './application/usecase/update-user.service';
import { DeleteUserService } from './application/usecase/delete-user.service';
import { GetUsersService } from './application/usecase/get-users.service';
import { UpdateLocationService } from './application/usecase/update-location.service';
import { AuthController } from './infrastructure/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Gender, UserLocation],
      synchronize: false,
      logging: ['error', 'warn', 'info'],
    }),
    TypeOrmModule.forFeature([User, Gender, UserLocation]),
    JwtModule.register({
      secret: process.env.SECRETO_JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    RegisterUserService,
    UpdateUserService,
    DeleteUserService,
    GetUsersService,
    UpdateLocationService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserInMysqlRepository,
    },
  ],
})
export class UserModule {}
