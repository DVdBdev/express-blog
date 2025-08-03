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