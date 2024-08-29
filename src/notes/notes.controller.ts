import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { GoogleOAuthGuard } from 'src/auth/guards/google-oauth.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { Note } from './schemas/note.schema';

@Controller('notes')
@UseGuards(GoogleOAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(
    @Req() req,
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return this.notesService.create(createNoteDto, req.user.email);
  }

  @Get()
  async findAll(@Req() req): Promise<Note[]> {
    return this.notesService.findAllByUser({
      userEmail: req.user.email,
    });
  }

  @Get(':noteId')
  async findOne(@Req() req, @Param('noteId') noteId: string): Promise<Note> {
    return this.notesService.findOne({
      id: noteId,
      userEmail: req.user.email,
    });
  }

  @Patch(':noteId')
  async updateOne(
    @Req() req,
    @Param('noteId') noteId: string,
    @Body(new ValidationPipe()) updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateOne({
      id: noteId,
      userEmail: req.user.email,
      updateNoteDto,
    });
  }

  @Delete(':noteId')
  async deleteOne(@Req() req, @Param('noteId') noteId: string) {
    return this.notesService.deleteOne({
      id: noteId,
      userEmail: req.user.email,
    });
  }
}
