import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  username: string;
  password?: string;
  role: "ADMIN" | "USER" | "FAKE_USER";
  profileImage?: string;
  bio?: string;
  posts?: ObjectId[];
  profileViews?: number;
  settings?: Record<string, any>;
}

export interface Journey {
  _id?: ObjectId;
  title: string;
  description: string;
  creatorId: ObjectId;
  posts: ObjectId[];
  kudos: number;
  tags: string[];
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Blog {
  _id?: ObjectId;
  title: string;
  description: string;
  content: EditorJsOutput;
  createdAt: Date;
  journeyId: ObjectId;
  userId: ObjectId;
  imageUrl: string;
  tags: string[];
  kudos: number;
  readLength: number;
}

export interface EditorJsOutput {
  time: number;
  blocks: {
    id?: string;
    type: string;
    data: Record<string, any>;
  }[];
  version: string;
}