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

const newPostFormSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export function NewPostForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(newPostFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();

      reset();
    },
  });

  const onSubmit = (values: any) => {
    if (isSubmitting) return;

    createPost.mutate(
      {
        ...values,
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

        <Button
          type="submit"
          className="flex w-full gap-2"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? (
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
