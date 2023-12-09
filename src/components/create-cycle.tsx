"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import { CycleDTO } from "@/interface/Cycle";
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
export function CreateCycle({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const [stage, setStage] = useState<string>(
    "seedling" || "vegetating" || "flowering" || "drying" || "curing",
  );
  console.log("userId", userId);
  const [cycleName, setCycleName] = useState("");
  const [week, setWeek] = useState("");
  if (!userId) return null;
  const createCycle = api.cycle.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setStage("");
      setCycleName("");
      setWeek("");
    },
  });

  const cycleFormSchema = z.object({
    stage: z.string(),
    cycleName: z.string(),
    week: z.string(),
  });

  const form = useForm<z.infer<typeof cycleFormSchema>>({
    resolver: zodResolver(cycleFormSchema),
    defaultValues: {
      stage: "",
      cycleName: "",
      week: "",
    },
  });

  const onSubmit = (values: z.infer<typeof cycleFormSchema>) => {
    createCycle.mutate({
      userId: userId,
      ...values,
    });
  };

  const options = ["seedling", "vegetating", "flowering", "drying", "curing"];
  if (!userId) return null;
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center justify-center space-y-8 border"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>plants stage</FormLabel>
              <FormControl>
                <select placeholder="shadcn" {...field}>
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
          name="cycleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cycle name</FormLabel>
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
          name="week"
          render={({ field }) => (
            <FormItem>
              <FormLabel>week</FormLabel>
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
        <Button type="submit" disabled={createCycle.isLoading}>
          {createCycle.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
