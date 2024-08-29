import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';

import { Tags } from '../enums/tags.enum';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  createdAt: Date;

  @IsEnum(Tags)
  @IsArray()
  tags: Tags[];
}
