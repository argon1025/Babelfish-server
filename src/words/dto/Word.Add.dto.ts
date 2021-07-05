import { ApiProperty } from '@nestjs/swagger';

export class WordAddDto {
  @ApiProperty({
    example: 'word',
    description: '단어',
    required: true,
  })
  public title: string;

  @ApiProperty({
    example: '워드',
    description: '발음',
    required: true,
  })
  public mean1: string;

  @ApiProperty({
    example: '단어',
    description: '단어 뜻',
    required: true,
  })
  public mean2: string;
}
