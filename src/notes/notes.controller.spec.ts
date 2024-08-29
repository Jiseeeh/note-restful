import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Tags } from './enums/tags.enum';

describe('NotesController', () => {
  let notesController: NotesController;
  let notesService: NotesService;
  const now = new Date();
  const req = { user: { email: 'test@example.com' } };
  const noteId = '1';
  const createdNotes = [];
  const createNoteDto: CreateNoteDto = {
    title: 'Test Note',
    content: 'Content',
    createdAt: now,
    tags: [Tags.OTHER],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            create: jest.fn(),
            findAllByUser: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    notesController = module.get<NotesController>(NotesController);
    notesService = module.get<NotesService>(NotesService);
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const result = {
        ...createNoteDto,
        _id: '1',
        user: req.user.email,
        updatedAt: now,
        __v: 0,
      };

      createdNotes.push(result);

      jest.spyOn(notesService, 'create').mockResolvedValue(result);

      expect(await notesController.create(req, createNoteDto)).toBe(result);
      expect(notesService.create).toHaveBeenCalledWith(
        createNoteDto,
        'test@example.com',
      );
    });
  });

  describe('findAllByUser', () => {
    it('should return all notes for the authenticated user', async () => {
      jest.spyOn(notesService, 'findAllByUser').mockResolvedValue(createdNotes);

      expect(await notesController.findAllByUser(req)).toBe(createdNotes);
      expect(notesService.findAllByUser).toHaveBeenCalledWith({
        userEmail: 'test@example.com',
      });
    });
  });

  describe('findOne', () => {
    it('should return a single note by id for the authenticated user', async () => {
      const result = createdNotes.find((note) => note._id === noteId);

      jest.spyOn(notesService, 'findOne').mockResolvedValue(result);

      expect(await notesController.findOne(req, noteId)).toBe(result);
      expect(notesService.findOne).toHaveBeenCalledWith({
        id: noteId,
        userEmail: 'test@example.com',
      });
    });
  });

  describe('updateOne', () => {
    it('should update a note by id for the authenticated user', async () => {
      const updateNoteDto: UpdateNoteDto = {
        title: 'Updated Note',
        content: 'Updated Content',
      };

      const result = {
        message: 'Successfully updated note.',
        success: true,
      };

      jest.spyOn(notesService, 'updateOne').mockResolvedValue(result);

      expect(await notesController.updateOne(req, noteId, updateNoteDto)).toBe(
        result,
      );
      expect(notesService.updateOne).toHaveBeenCalledWith({
        id: noteId,
        userEmail: req.user.email,
        updateNoteDto,
      });
    });
  });

  describe('deleteOne', () => {
    it('should delete a note by id for the authenticated user', async () => {
      const result = {
        message: 'Successfully deleted note.',
        success: true,
      };
      jest.spyOn(notesService, 'deleteOne').mockResolvedValue(result);

      expect(await notesController.deleteOne(req, noteId)).toBe(result);
      expect(notesService.deleteOne).toHaveBeenCalledWith({
        id: noteId,
        userEmail: req.user.email,
      });
    });
  });
});
