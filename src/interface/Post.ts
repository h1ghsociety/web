import { Timestamp } from "firebase/firestore";
import { z } from "zod";
import { type Author } from "./Author";
export interface Post {
  uid: string;
  title: string;
  content: string;
  author: Author;
  album_url: string[];
  cycle: string;
  plant: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const newPostFormSchema = z.object({
  title: z.string(),
  cycle: z.string(),
  plant: z.string(),
  content: z.string(),
  album_url: z.custom<FileList>(),
});

export const postSchema = z.object({
  uid: z.string().optional(),
  title: z.string(),
  cycle: z.string(),
  plant: z.string(),
  content: z.string(),
  album_url: z.array(z.string()),
  createdAt: z.instanceof(Timestamp).optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

export type NewPostDTO = z.infer<typeof newPostFormSchema>;
