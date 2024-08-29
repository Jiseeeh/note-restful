import { ApiProperty } from '@nestjs/swagger';
import { Tags } from '../enums/tags.enum';

export class NoteResponse {
  @ApiProperty({
    description: 'The user who created the note',
  })
  user: string;

  @ApiProperty({
    description: 'The title of the note',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the note',
  })
  content: string;

  @ApiProperty({
    description: 'The date the note was created',
  })
  createdAt: string;

  @ApiProperty({
    description: 'The date the note was last updated',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'The tags associated with the note',
  })
  tags: Tags[];

  @ApiProperty({
    description: 'The unique identifier of the note',
  })
  _id: string;

  @ApiProperty({
    description: 'MongoDB version key',
  })
  __v: number;
}
