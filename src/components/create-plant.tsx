"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { storage } from "@/server/firebase";
import { Input } from "./ui/input";
import { plantFormSchema, type PlantDTO } from "@/interface/Plant";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2Icon } from "lucide-react";
import { useUploadFilesToStorage } from "@/hooks/useUploadFilesToStorage";
export interface FilePreview {
  file: File;
  preview: string;
}

export function CreatePlant() {
  const router = useRouter();
  const session = useSession();
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const { mutate: createPlant, isLoading: isCreating } =
    api.plant.create.useMutation({
      onSuccess: () => {
        router.refresh();

        reset();
      },
    });
  const { mutate: uploadFilesToStorage, isLoading: isUploadingFiles } =
    useUploadFilesToStorage();
  const { mutate: addPlantToCycle, isLoading: isAddingPlantToCycle } =
    api.cycle.addPlantToCycle.useMutation();

  const { data: cycles } = api.cycle.getLatest.useQuery();

  const form = useForm<PlantDTO>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: {
      strain: "",
      album_url: [],
      seed_type: "",
      cycle: "",
    },
  });
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const watchPhotos = watch("album_url");

  const onSubmit = async (data: PlantDTO) => {
    if (isSubmitting) return;

    if (!storage) return;
    if (!session.data?.user) return;

    uploadFilesToStorage(
      {
        files: data.album_url,
      },
      {
        onSuccess: (newAlbum) => {
          createPlant(
            {
              ...data,
              album_url: newAlbum,
            },
            {
              onSuccess: (plant) => {
                if (data.cycle) {
                  const cycle = cycles?.find((c) => c.uid === data.cycle);

                  if (!cycle) return;

                  addPlantToCycle({
                    uid: data.cycle,
                    plants: [...cycle.plants, plant.uid],
                  });
                }
              },
            },
          );
        },
      },
    );
  };

  const handleFilesChange = (files: FileList) => {
    const newFilePreviews: FilePreview[] = Array.from(files).map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setFilePreviews(newFilePreviews);
  };

  const options = ["Regular", "Feminized", "Automatic", "Clone"];

  useEffect(() => {
    if (watchPhotos.length > 0) {
      handleFilesChange(watchPhotos);
    }
  }, [watchPhotos]);

  const fileRef = form.register("album_url");

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center justify-center space-y-6 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="self-start text-2xl font-semibold">Add a new plant</h1>

        <FormField
          control={control}
          name="strain"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">Strain</FormLabel>

              <FormControl className="mt-2">
                <Input placeholder="AK-47, Blue Dream, etc." {...field} />
              </FormControl>

              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="seed_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">Seed Type</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the seed type" />
                </SelectTrigger>

                <SelectContent>
                  {options.map((option) => {
                    return (
                      <SelectItem
                        key={option}
                        value={option}
                        className="capitalize"
                      >
                        {option}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <FormMessage className="text-xs text-red-600" />
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
          control={form.control}
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
                    {filePreviews.length > 0 ? (
                      filePreviews.map((filePreview, index) => (
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
          className="w-full"
          disabled={isCreating || isUploadingFiles || isAddingPlantToCycle}
        >
          {isCreating || isUploadingFiles || isAddingPlantToCycle ? (
            <>
              <Loader2Icon className="mr-3 inline-block h-5 w-5 animate-spin" />
              Creating
            </>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
