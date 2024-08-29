import { Injectable } from '@nestjs/common';

import { NoteRepository } from './note.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async create(createNoteDto: CreateNoteDto, userEmail: string) {
    return await this.noteRepository.create(createNoteDto, userEmail);
  }

  async findAllByUser({
    userEmail,
    page,
    limit,
  }: {
    userEmail: string;
    page?: number;
    limit?: number;
  }) {
    return await this.noteRepository.findAllByUser({
      email: userEmail,
      page,
      limit,
    });
  }

  async findOne({ id, userEmail }: { id: string; userEmail: string }) {
    return await this.noteRepository.findOne(id, userEmail);
  }

  async updateOne({
    id,
    userEmail,
    updateNoteDto,
  }: {
    id: string;
    userEmail: string;
    updateNoteDto: UpdateNoteDto;
  }) {
    return await this.noteRepository.updateOne(id, userEmail, updateNoteDto);
  }

  async deleteOne({ id, userEmail }: { id: string; userEmail: string }) {
    return await this.noteRepository.deleteOne(id, userEmail);
  }

  // async addMockData({ userEmail }: { userEmail: string }) {
  //   return await this.noteRepository.addMockData(userEmail);
  // }
}
