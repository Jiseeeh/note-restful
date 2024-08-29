import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends OmitType(PartialType(CreateNoteDto), [
  'createdAt',
] as const) {}
