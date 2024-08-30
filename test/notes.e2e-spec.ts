import * as request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { MockAuthGuard } from './mock/auth-guard.mock';
import { GoogleOAuthGuard } from '../src/auth/guards/google-oauth.guard';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { Tags } from '../src/notes/enums/tags.enum';

describe('NotesController (e2e)', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;
  let noteId = '';

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    await mongoose.connect(uri);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(GoogleOAuthGuard)
      .useValue(new MockAuthGuard())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoMemoryServer.stop();
    await app.close();
  });

  it('/POST notes (should create a note)', async () => {
    const note: CreateNoteDto = {
      title: 'Test Note',
      content: 'This is a supertest sheeesh',
      tags: [Tags.PERSONAL],
    };

    return request(app.getHttpServer())
      .post('/notes')
      .send(note)
      .expect(201)
      .then((response) => {
        noteId = response.body._id;
        expect(response.body).toHaveProperty('title', note.title);
      });
  });

  it('/GET notes (should return all notes)', async () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/GET notes/:noteId (should return a specific note)', async () => {
    return request(app.getHttpServer())
      .get(`/notes/${noteId}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id', noteId);
      });
  });

  it('/PATCH notes/:noteId (should update a note)', async () => {
    return request(app.getHttpServer())
      .patch(`/notes/${noteId}`)
      .send({
        title: 'Updated Test Note',
        content: 'This note has been updated',
      })
      .expect(204);
  });

  it('/DELETE notes/:noteId (should delete a note)', async () => {
    return request(app.getHttpServer()).delete(`/notes/${noteId}`).expect(204);
  });
});
