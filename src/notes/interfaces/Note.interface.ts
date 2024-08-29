import { Tags } from '../enums/tags.enum';

export interface Note {
  id: string;
  userEmail: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tags[];
}
