import { Controller, Get, Post } from '@nestjs/common';

import { NotesService } from './notes.service';
import { Note } from './interfaces/note.interface';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(): Promise<Note> {
    return this.notesService.create();
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }
}
