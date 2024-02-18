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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { type FilePreview } from "./create-plant";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const newPostFormSchema = z.object({
  title: z.string(),
  cycle: z.string(),
  plant: z.string(),
  content: z.string(),
  album_url: z.instanceof(FileList),
});

export type NewPostDTO = z.infer<typeof newPostFormSchema>;

export function NewPostForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { data: cycles } = api.cycle.getLatest.useQuery();
  const { data: plants } = api.plant.getLatest.useQuery();

  const form = useForm<NewPostDTO>({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: "",
      cycle: "",
      plant: "",
      content: "",
      album_url: {} as FileList,
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

  const onSubmit = (data: NewPostDTO) => {
    if (isSubmitting) return;

    console.log("FORM DATA", data);

    createPost(
      {
        ...data,
      },
      {
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

  const fileRef = register("album_url");
  const watchPhotos = watch("album_url");

  const previewFiles = useMemo(() => {
    const newFilePreviews: FilePreview[] = Array.from(watchPhotos).map(
      (file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      }),
    );

    return newFilePreviews;
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
                            {option.strain}
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
          disabled={isCreating}
        >
          {isCreating ? (
            <>
              Creating <Loader2Icon className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Create post"
          )}
        </Button>
      </form>
    </Form>
  );
}
