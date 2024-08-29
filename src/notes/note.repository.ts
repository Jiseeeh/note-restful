import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';
import { Tags } from './enums/tags.enum';

@Injectable()
export class NoteRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto, email: string): Promise<any> {
    const createdNote = await this.noteModel.create({
      ...createNoteDto,
      user: email,
      updatedAt: new Date(),
    });

    return createdNote;
  }

  async findAllByUser({
    email,
    page = 1,
    limit = 10,
  }: {
    email: string;
    page?: number;
    limit?: number;
  }): Promise<any[]> {
    const skip = (page - 1) * limit;

    const result = await this.noteModel
      .find()
      .where({
        user: email,
      })
      .skip(skip)
      .limit(limit)
      .exec();

    if (result.length === 0) {
      throw new HttpException('Notes not found.', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: string, userEmail: string): Promise<any> {
    const result = await this.noteModel
      .findOne({ _id: id, user: userEmail })
      .exec();

    if (!result) {
      throw new HttpException('Note not found.', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateOne(id: string, userEmail: string, updateNoteDto: UpdateNoteDto) {
    const result = await this.noteModel
      .updateOne(
        { _id: id, user: userEmail },
        {
          ...updateNoteDto,
          updatedAt: new Date(),
        },
      )
      .exec();

    const { matchedCount, modifiedCount } = result;
    let message = '';
    let success = true;

    if (matchedCount > 0 && modifiedCount > 0) {
      message = 'Document updated successfully.';
    } else if (matchedCount > 0 && modifiedCount === 0) {
      throw new HttpException(
        'No changes made to the document.',
        HttpStatus.NOT_MODIFIED,
      );
    } else {
      message = 'Update failed or document not found.';
      success = false;
    }

    return {
      message,
      success,
    };
  }

  async deleteOne(id: string, userEmail: string) {
    try {
      const result = await this.noteModel
        .deleteOne({ _id: id, user: userEmail })
        .exec();

      const { deletedCount } = result;
      let message = '';
      let success = true;

      if (deletedCount > 0) {
        message = 'Document deleted successfully.';
      } else {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

      return {
        message,
        success,
      };
    } catch (error) {
      throw new HttpException(
        'Something went wrong, It could be the id is wrongly formatted',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async addMockData(userEmail: string) {
  //   const notes = Array.from({ length: 100 }, () => ({
  //     title: faker.lorem.sentence(),
  //     content: faker.lorem.paragraph({ min: 2, max: 5 }),
  //     tags: [
  //       faker.helpers.arrayElement([
  //         Tags.WORK,
  //         Tags.SHOPPING,
  //         Tags.PERSONAL,
  //         Tags.OTHER,
  //       ]),
  //     ],
  //     user: userEmail,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }));

  //   await this.noteModel.insertMany(notes);

  //   return {
  //     message: 'Mock data added successfully',
  //   };
  // }
}
