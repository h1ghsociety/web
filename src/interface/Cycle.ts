import { type Timestamp } from "firebase-admin/firestore";
import * as z from "zod";
import { type Author } from "./Author";

export const cycleFormSchema = z.object({
  name: z.string(),
});

export type CycleDTO = z.infer<typeof cycleFormSchema>;

export interface Cycle {
  uid: string;
  name: string;
  author: Author;
  createdAt: Timestamp;
  plants: string[];
}
