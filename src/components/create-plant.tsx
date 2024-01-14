/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
      cycle: "aaa",
    },
  });

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

    console.log("album", newAlbum);
    createPlant({
      ...data,

      userId: userId,
      album_url: newAlbum,
    });
  };

  const options = ["regular", "femized", "automatic", "clone"];
  if (!userId) return null;
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center justify-center space-y-8 border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="strain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>plants Strain</FormLabel>
              <FormControl>
                <input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seed_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>seed Type</FormLabel>
              <FormControl>
                <select {...field}>
                  {options.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>album</FormLabel>
              <FormControl>
                {/* <input placeholder="shadcn" {...field} /> */}
                <Input
                  multiple
                  onChange={(e) => {
                    console.log("e", e.target.files);
                    field.onChange(e.target.files ? [...e.target.files] : null);
                  }}
                  // {...field}
                  type="file"
                  placeholder="shadcn"
                />
                {/* <FileInput /> */}
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cycle</FormLabel>
              <FormControl>
                <select {...field}>
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
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
