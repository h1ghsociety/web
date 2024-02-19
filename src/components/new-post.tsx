"use client";

import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { type FilePreview } from "./create-plant";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { type NewPostDTO, newPostFormSchema } from "@/interface/Post";
import { useSession } from "next-auth/react";
import { storage } from "@/server/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function NewPostForm() {
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();
  const { data: cycles } = api.cycle.getLatest.useQuery();
  const { data: plants } = api.plant.getLatest.useQuery();
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const form = useForm<NewPostDTO>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: "",
      cycle: "",
      plant: "",
      content: "",
      album_url: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const { mutate: createPost, isLoading: isCreating } =
    api.post.create.useMutation({
      onSuccess: () => {
        router.refresh();

        reset();
      },
    });
  const { mutate: addPhotosToPlant } = api.plant.update.useMutation();
  const { mutate: addPostToUser } = api.user.addPost.useMutation();

  const onSubmit = async (data: NewPostDTO) => {
    if (isSubmitting || !session.data) return;

    console.log("FORM DATA", data);

    const newAlbum = await handleUploadFiles(
      data.album_url,
      `/${session.data.user.id}/plants/${data.plant}`,
    );

    createPost(
      {
        ...data,
        album_url: newAlbum,
      },
      {
        onSuccess: (post) => {
          if (!post.uid) return;

          addPostToUser({
            uid: session.data.user.id,
            postId: post.uid,
          });

          const joinedAlbums = plants
            ?.find((plant) => plant.uid === post.plant)
            ?.album_url.concat(newAlbum);

          if (!joinedAlbums) return;

          addPhotosToPlant(
            {
              uid: post.plant,
              album_url: joinedAlbums,
            },
            {
              onSuccess: () => {
                router.push("/feed");
              },
            },
          );
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleUploadFiles = async (files: FileList, path: string) => {
    setIsUploadingFiles(true);

    const albumURLs = Object.values(files).map(async (file) => {
      const storageRef = ref(storage, `${path}/${file.name}`);

      await uploadBytes(storageRef, file);

      const imageUrl = await getDownloadURL(storageRef);

      return imageUrl;
    });

    const newAlbum = await Promise.all(albumURLs);

    setIsUploadingFiles(false);

    return newAlbum;
  };

  const fileRef = register("album_url");
  const watchPhotos = watch("album_url");

  const previewFiles = useMemo(() => {
    if (!watchPhotos) return [];

    const newFilePreviews: FilePreview[] = Array.from(watchPhotos).map(
      (file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      }),
    );

    return newFilePreviews || [];
  }, [watchPhotos]);

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col justify-center space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Title</FormLabel>

              <FormControl>
                <Input placeholder="Enter post title" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cycle"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">Cycle</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select one of your cycles" />
                </SelectTrigger>

                <SelectContent>
                  {cycles
                    ? cycles.map((option) => {
                        return (
                          <SelectItem key={option.uid} value={option.uid}>
                            {option.name}
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
              </Select>

              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="plant"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">Plant</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select one of your plants" />
                </SelectTrigger>

                <SelectContent>
                  {plants
                    ? plants.map((option) => {
                        return (
                          <SelectItem key={option.uid} value={option.uid}>
                            <p>{option.name}</p>
                            <p className="text-xs text-muted">
                              {option.strain} - {option.seed_type}
                            </p>
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
              </Select>

              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Content</FormLabel>

              <FormControl>
                <Textarea placeholder="Enter post content" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="album_url"
          render={() => (
            <FormItem className="gap- flex w-full flex-col">
              <div className="flex flex-col gap-2">
                <FormLabel className="leading-1 w-full text-lg font-semibold">
                  Photos
                </FormLabel>

                <FormControl className="flex flex-grow flex-col items-center justify-center">
                  <Input multiple type="file" {...fileRef} />
                </FormControl>
              </div>

              <div className="flex flex-col">
                <FormMessage className="mt-1 text-xs text-red-600" />

                <FormControl className="mt-0">
                  <div className="flex flex-wrap rounded-md border border-gray-300 bg-gray-100 p-4">
                    {previewFiles.length > 0 ? (
                      previewFiles.map((filePreview, index) => (
                        <Image
                          key={filePreview.file.name}
                          src={filePreview.preview}
                          alt={`Preview ${index}`}
                          width={80}
                          height={80}
                          className="h-28 w-28 rounded-md object-cover"
                        />
                      ))
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="text-gray-500">No files selected</p>
                      </div>
                    )}
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full gap-2"
          disabled={isCreating || isUploadingFiles}
        >
          {isCreating || isUploadingFiles ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Posting
            </>
          ) : (
            "Post"
          )}
        </Button>
      </form>
    </Form>
  );
}
