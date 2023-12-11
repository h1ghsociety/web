/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
export function CreatePlant({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const [stage, setStage] = useState<string>(
    "seedling" || "vegetating" || "flowering" || "drying" || "curing",
  );

  if (!userId) return null;
  const createPlant = api.plant.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const plantFormSchema = z.object({
    strain: z.string(),
    album_url: z.string(),
    seed_type: z.string(),
    cycle: z.string(),
  });

  const form = useForm<z.infer<typeof plantFormSchema>>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: {
      strain: "",
      album_url: "",
      seed_type: "",
      cycle: "",
    },
  });

  const onSubmit = (values: z.infer<typeof plantFormSchema>) => {
    createPlant.mutate({
      userId: userId,
      ...values,
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
          name="cycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>cccc</FormLabel>
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

        <Button type="submit" disabled={createPlant.isLoading}>
          {createPlant.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
