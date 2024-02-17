import { type Timestamp } from "firebase-admin/firestore";
import * as z from "zod";

export const cycleFormSchema = z.object({
  name: z.string(),
});

export type CycleDTO = z.infer<typeof cycleFormSchema>;

export interface Cycle {
  uid: string;
  name: string;
  author: {
    uid: string;
    displayName: string;
    avatarUrl: string;
  };
  createdAt: Timestamp;
  plants: string[];
}
