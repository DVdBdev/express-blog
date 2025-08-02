import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    username: string;
    password?: string;
    role: "ADMIN" | "USER";
}

export interface Journey {
  _id?: ObjectId;
  title: string;
  description: string;
  author: Pick<User, "_id" | "username">;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  isPublic?: boolean;
  coverImage?: string;
}