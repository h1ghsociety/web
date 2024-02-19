import { type Timestamp } from "firebase-admin/firestore";
import { z } from "zod";
export interface Post {
  uid: string;
  title: string;
  content: string;
  album_url: string[];
  cycle: string;
  plant: string;
  createdAt: Timestamp;
}

export const newPostFormSchema = z.object({
  title: z.string(),
  cycle: z.string(),
  plant: z.string(),
  content: z.string(),
  album_url: z.custom<FileList>(),
});

export type NewPostDTO = z.infer<typeof newPostFormSchema>;
