import { storage } from "@/server/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFilesToStorage = async (
  files: FileList,
  newPlantId: string,
  userId: string,
) => {
  const albumURLs = Object.values(files).map(async (file) => {
    const storageRef = ref(
      storage,
      `/${userId}/plants/${newPlantId}/${file.name}`,
    );

    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  });

  const newAlbum = await Promise.all(albumURLs);

  return Promise.all(newAlbum);
};
