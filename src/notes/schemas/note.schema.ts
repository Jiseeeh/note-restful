import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { User } from 'src/user/schemas/user.schema';
import { Tags } from '../enums/tags.enum';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ type: String, ref: 'User' })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ type: [String], enum: Tags, required: true })
  tags: Tags[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
