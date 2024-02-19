import { Timestamp } from "firebase/firestore";
import { z } from "zod";
import { type Author } from "./Author";

export interface Plant {
  uid: string;
  author: Author;
  name: string;
  strain: string;
  album_url: string[];
  seed_type: string;
  cycle: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const plantFormSchema = z.object({
  name: z.string().min(3).max(60),
  strain: z.string().min(2),
  seed_type: z
    .string()
    .refine((val) =>
      ["Regular", "Feminized", "Automatic", "Clone"].includes(val),
    ),
  cycle: z.string().refine((val) => val !== "Select one of your cycles"),
  album_url: z.custom<FileList>().refine(
    (val) => (
      val.length > 0,
      {
        message: "Add at least one photo.",
        path: ["album_url"],
      }
    ),
  ),
});

export const plantSchema = z.object({
  uid: z.string(),
  name: z.string().min(3).max(60),
  strain: z.string().min(2),
  seed_type: z
    .string()
    .refine((val) =>
      ["Regular", "Feminized", "Automatic", "Clone"].includes(val),
    ),
  cycle: z.string().refine((val) => val !== "Select one of your cycles"),
  album_url: z.array(z.string()),
  createdAt: z.instanceof(Timestamp).optional(),
  updatedAt: z.instanceof(Timestamp).optional(),
});

export type PlantDTO = z.infer<typeof plantFormSchema>;
