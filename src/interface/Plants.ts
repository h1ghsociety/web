import { z } from "zod";

export interface Plant {
  uid: string;

  plantDTO: PlantDTO;
}

export const plantFormSchema = z.object({
  strain: z.string(),
  album_url: z.instanceof(File).array(),
  seed_type: z.string(),
  cycle: z.string().min(0),
});

export type PlantDTO = z.infer<typeof plantFormSchema>;
