import { storage } from "@/server/firebase";
import { useMutation } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";

export const useUploadFilesToStorage = () => {
  const session = useSession();

  return useMutation({
    mutationKey: ["uploadFilesToStorage"],
    mutationFn: async ({ files }: { files: FileList }) => {
      const albumURLs = Object.values(files).map(async (file) => {
        const storageRef = ref(
          storage,
          `/${session.data?.user.id}/plants/${file.name}`,
        );

        await uploadBytes(storageRef, file);

        const imageUrl = await getDownloadURL(storageRef);

        return imageUrl;
      });

      const newAlbum = await Promise.all(albumURLs);

      return Promise.all(newAlbum);
    },
  });
};
