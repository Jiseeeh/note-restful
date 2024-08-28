import { Tags } from '../enums/Tags.enum';

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tags[];
}
