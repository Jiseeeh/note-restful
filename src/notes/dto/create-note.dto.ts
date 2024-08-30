import {
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';

import { Tags } from '../enums/tags.enum';

export class CreateNoteDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsArray()
  @IsEnum(Tags, { each: true })
  tags: Tags[];
}
