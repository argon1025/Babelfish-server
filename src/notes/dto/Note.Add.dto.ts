import { ApiProperty } from '@nestjs/swagger';

export class NoteAddDto {
  @ApiProperty({
    example: 'TestNote',
    description: '노트 이름',
    required: true,
  })
  public notename: string;
}
