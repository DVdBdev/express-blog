import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  username: string;
  password?: string;
  role: "ADMIN" | "USER";
}

export interface Journey {
  _id: string;
  title: string;
  description: string;
  creator: {
    _id: string;
    username: string;
  };
  posts: string[];
  kudos: number;
  tags: string[];
  imageUrl: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: EditorJsOutput;
  createdAt: string;
  journeyId: string;
  author: {
    _id: string;
    username: string;
  };
  imageUrl: string;
  tags: string[];
  kudos: number;
}

interface EditorJsOutput {
  time: number;
  blocks: {
    id?: string;
    type: string;
    data: Record<string, any>;
  }[];
  version: string;
}