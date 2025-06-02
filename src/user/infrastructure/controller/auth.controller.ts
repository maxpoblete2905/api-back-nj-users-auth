// src/infrastructure/controller/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoginService } from '../../application/usecase/login.service';
import { RegisterUserService } from '../../application/usecase/register-user.service';
import { UpdateUserService } from '../../application/usecase/update-user.service';
import { DeleteUserService } from '../../application/usecase/delete-user.service';
import { GetUsersService } from '../../application/usecase/get-users.service';
import { UpdateLocationService } from '../../application/usecase/update-location.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/application/dto/login.dto';
import { RegisterUserDto } from 'src/user/application/dto/register-user.dto';
import { UpdateUserDto } from 'src/user/application/dto/update-user.dto';
import { UpdateLocationDto } from 'src/user/application/dto/update-location.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentication & Users')
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
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginDto) {
    return this.loginService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() body: RegisterUserDto) {
    return this.registerUserService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get users with filters' })
  @ApiQuery({ name: 'startDate', required: false, example: '2023-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2023-12-31' })
  @ApiQuery({ name: 'email', required: false, example: 'user@example.com' })
  @ApiQuery({ name: 'name', required: false, example: 'John Doe' })
  @ApiQuery({ name: 'rut', required: false, example: '12345678-9' })
  @ApiOkResponse({ description: 'List of users retrieved successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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

  @UseGuards(JwtAuthGuard)
  @Put('users/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.updateUserService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
    return this.deleteUserService.delete(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('users/:id/location')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user location' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateLocationDto })
  @ApiOkResponse({ description: 'Location updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateLocation(
    @Param('id') id: string,
    @Body() body: UpdateLocationDto,
  ) {
    return this.updateLocationService.updateLocation(
      +id,
      body.latitude,
      body.longitude,
    );
  }
}
