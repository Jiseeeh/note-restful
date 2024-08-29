import { CreateNoteDto } from './dto/create-note-dto';
import { Injectable } from '@nestjs/common';

import { Note } from './interfaces/note.interface';
import { Tags } from './enums/tags.enum';

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto, userEmail: string): Note {
    console.log(createNoteDto);

    return {
      id: 'acknowledged',
      title: 'Note 1',
      userEmail: '1@gmail.com',
      content: 'content of Note 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [Tags.WORK],
    };
  }

  findAllByUser({ email: string }): Note[] {
    return [];
  }
}
