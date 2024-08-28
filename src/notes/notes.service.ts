import { Injectable } from '@nestjs/common';
import { Note } from './interfaces/Note.interface';
import { Tags } from './enums/Tags.enum';

@Injectable()
export class NotesService {
  create(): Note {
    return {
      id: '1',
      title: 'Note 1',
      userId: '1',
      content: 'content of Note 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [Tags.WORK],
    };
  }

  findAll(): Note[] {
    return [];
  }
}
