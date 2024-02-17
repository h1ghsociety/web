/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CycleDTO } from "@/interface/Cycle";
import FileInput from "./dragndrop/fileInput";
import { storage } from "@/server/firebase";
import { Input } from "./ui/input";
import { plantFormSchema, PlantDTO } from "@/interface/Plants";
export interface FilePreview {
  file: File;
  preview: string;
}

export function CreatePlant({
  userId,
  getCycles,
}: {
  userId: string | undefined;
  getCycles: CycleDTO[];
}) {
  const router = useRouter();
  const [stage, setStage] = useState<string>(
    "seedling" || "vegetating" || "flowering" || "drying" || "curing",
  );
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  if (!userId) return null;
  const { mutate: createPlant, isLoading: isCreating } =
    api.plant.create.useMutation({
      onSuccess: () => {
        router.refresh();
      },
    });

  const form = useForm<PlantDTO>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: {
      strain: "",
      album_url: [],
      seed_type: "",
      cycle: "",
    },
  });

  console.log("filePre", filePreviews);

  const onSubmit = async (data: PlantDTO) => {
    const files = form.getValues("album_url");
    console.log("data", data);

    if (!storage) return;
    const albumURLs = files.map(async (file) => {
      const storageRef = ref(storage, `/${userId}/plants`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded an array!");
      });
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    });

    const newAlbum = await Promise.all(albumURLs);

    console.log("new", newAlbum);

    console.log("album", newAlbum);
    createPlant({
      ...data,

      userId: userId,
      album_url: newAlbum,
    });
  };

  const handleFilesChange = (files: FileList) => {
    const newFilePreviews: FilePreview[] = Array.from(files).map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setFilePreviews(newFilePreviews);
  };

  // useEffect(() => {
  //   return () => {
  //     filePreviews.forEach((file) => URL.revokeObjectURL(file.preview));
  //   };
  // }, [filePreviews]);

  const options = ["regular", "femized", "automatic", "clone"];
  if (!userId) return null;
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="strain"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">
                plants Strain
              </FormLabel>
              <FormControl className="mt-2">
                <Input
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none"
                  placeholder="Enter plant strain"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seed_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">seed Type</FormLabel>
              <FormControl className="mt-2">
                <select
                  {...field}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:border-gray-500 focus:outline-none"
                >
                  {options.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album_url"
          render={({ field }) => (
            <FormItem className="flex w-full gap-4">
              <div className="flex w-1/2  flex-col">
                <FormLabel className="w-full text-lg font-semibold">
                  album
                </FormLabel>

                <FormControl className="flex  flex-grow flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-4">
                  <Input
                    multiple
                    onChange={(e) => {
                      handleFilesChange(e.target.files!);
                      console.log("e", e.target.files);
                      field.onChange(
                        e.target.files ? [...e.target.files] : null,
                      );
                    }}
                    // {...field}
                    type="file"
                    placeholder="shadcn"
                  />
                </FormControl>
              </div>
              <div className=" flex w-1/2 flex-col">
                <FormMessage className="mt-1 text-xs text-red-600" />

                <FormLabel className=" w-full text-lg font-semibold">
                  Files List
                </FormLabel>
                <FormControl className="mt-0">
                  <div className=" flex h-40 flex-wrap   rounded-md border border-gray-300 bg-gray-100 p-0 p-4">
                    {filePreviews.map((filePreview, index) => (
                      <div key={index} className="min-w-1/4 ">
                        <img
                          src={filePreview.preview}
                          alt={`Preview ${index}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycle"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">Cycle</FormLabel>
              <FormControl className="mt-2">
                <select
                  {...field}
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none"
                >
                  {getCycles.map((option) => {
                    if (option.userId === userId)
                      return (
                        <option key={option.uid} value={option.cycleName}>
                          {option.cycleName}
                        </option>
                      );
                  })}
                </select>
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isCreating}>
          {isCreating ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
