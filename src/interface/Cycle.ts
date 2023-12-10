export interface CycleDTO {
  uid: string;
  userId: string | undefined;
  cycleName: string;
  week: string;
  stage: "seedling" | "vegetating" | "flowering" | "drying" | "curing";
}
export interface Cycle {
  cycleDTO: CycleDTO;

  posts: string[];
  plants: string[];
}
