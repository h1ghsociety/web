export interface Plant {
  uid: string;

  plantDTO: PlantDTO;
}
export interface PlantDTO {
  uid: string;
  userId: string;
  strain: string;
  album_url: string[];
  seed_type: string;
  cycles: string[];
}
