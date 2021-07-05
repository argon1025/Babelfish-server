import { ApiProperty } from '@nestjs/swagger';

export class AccountLoginDto {
  @ApiProperty({
    example: 'argon1025@gmail.com',
    description: '이메일',
    required: true,
  })
  public userid: string;

  @ApiProperty({
    example: 'password1234',
    description: '패스워드',
    required: true,
  })
  public password: string;
}
