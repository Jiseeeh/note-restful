import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import { NotesService } from './notes.service';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note-dto';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('notes')
@UseGuards(GoogleOAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  async findAll(@Req() req): Promise<Note[]> {
    return this.notesService.findAllByUser({
      email: req.user.email,
    });
  }

  @Post()
  async create(
    @Req() req,
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    // i did not include the user email in the createNoteDto as
    // it will fail in validation because it runs first before i have the user email from req
    return this.notesService.create(createNoteDto, req.user.email);
  }
}
