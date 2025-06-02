import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'newpassword123', required: false })
  password?: string;

  @ApiProperty({ example: 'John Doe Updated', required: false })
  name?: string;
}
