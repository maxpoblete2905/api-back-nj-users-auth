// src/infrastructure/controller/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginService } from '../../application/usecase/login.service';
import { RegisterUserService } from '../../application/usecase/register-user.service';
import { UpdateUserService } from '../../application/usecase/update-user.service';
import { DeleteUserService } from '../../application/usecase/delete-user.service';
import { GetUsersService } from '../../application/usecase/get-users.service';
import { UpdateLocationService } from '../../application/usecase/update-location.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerUserService: RegisterUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly getUsersService: GetUsersService,
    private readonly updateLocationService: UpdateLocationService,
  ) {}

  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginService.login(body.email, body.password);
  }

  @Post('users/register')
  async register(@Body() body: any) {
    return this.registerUserService.register(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getUsers(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('email') email?: string,
    @Query('name') name?: string,
    @Query('rut') rut?: string,
  ) {
    return this.getUsersService.getUsers(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      email,
      name,
      rut,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    return this.updateUserService.update(+id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserService.delete(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('users/:id/location')
  async updateLocation(
    @Param('id') id: string,
    @Body() body: { latitude: number; longitude: number },
  ) {
    return this.updateLocationService.updateLocation(
      +id,
      body.latitude,
      body.longitude,
    );
  }
}
