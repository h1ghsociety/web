import { type Timestamp } from "firebase-admin/firestore";
import { z } from "zod";
import { type Author } from "./Author";

export interface Plant {
  uid: string;
  author: Author;
  createdAt: Timestamp;
  strain: string;
  album_url: string[];
  seed_type: string;
  cycle: string;
}

export const plantFormSchema = z.object({
  strain: z.string().min(2),
  seed_type: z.string(),
  cycle: z.string(),
  album_url: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});

export type PlantDTO = z.infer<typeof plantFormSchema>;
