import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NoteRepository } from './note.repository';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService, NoteRepository],
})
export class NotesModule {}
