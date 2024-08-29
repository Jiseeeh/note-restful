import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiNotModifiedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { Note } from './schemas/note.schema';
import { NoteResponse } from './responses/note.response';
import { GoogleOAuthGuard } from './../auth/guards/google-oauth.guard';

@ApiTags('notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(GoogleOAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  /**
   * Creates a new note for the authenticated user
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The note has been successfully created.',
    type: NoteResponse,
  })
  @ApiBadRequestResponse({
    description: 'Returns when the request body has invalid data',
  })
  async create(
    @Req() req,
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(createNoteDto, req.user.email);
  }

  /**
   * Returns all notes for the authenticated user
   */
  @Get()
  @ApiOkResponse({
    description: 'Returns all notes for the authenticated user',
    type: [NoteResponse],
  })
  @ApiNotFoundResponse({
    description: 'Returns when the user has no notes',
  })
  @ApiUnauthorizedResponse({
    description: 'Returns when the user is not authenticated',
  })
  async findAllByUser(@Req() req) {
    return this.notesService.findAllByUser({
      userEmail: req.user.email,
    });
  }

  /**
   * Returns a single note for the authenticated user
   */
  @Get(':noteId')
  @ApiOkResponse({
    description: 'Returns all notes for the authenticated user',
    type: NoteResponse,
  })
  async findOne(@Req() req, @Param('noteId') noteId: string): Promise<Note> {
    return this.notesService.findOne({
      id: noteId,
      userEmail: req.user.email,
    });
  }

  /**
   * Updates a single note for the authenticated user
   */
  @Patch(':noteId')
  @ApiNoContentResponse({
    description: 'Returns when the note has been successfully updated.',
  })
  @ApiNotModifiedResponse({
    description: 'Returns when the document was not modified',
  })
  @ApiBadRequestResponse({
    description: 'Returns when the request body has invalid data',
  })
  @HttpCode(204)
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

  /**
   * Deletes a single note for the authenticated user
   */
  @Delete(':noteId')
  @ApiNotFoundResponse({
    description: 'Returns when the note was not found',
  })
  @ApiNoContentResponse({
    description: 'Returns when the note has been successfully deleted',
  })
  @HttpCode(204)
  async deleteOne(@Req() req, @Param('noteId') noteId: string) {
    return this.notesService.deleteOne({
      id: noteId,
      userEmail: req.user.email,
    });
  }

  // @Post('mock')
  // async addMockData(@Req() req) {
  //   return this.notesService.addMockData({ userEmail: req.user.email });
  // }
}
