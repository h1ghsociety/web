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
import { Input } from "./ui/input";
import { Select } from "./ui/select";
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
        className="flex w-full flex-col items-center justify-center space-y-6 rounded-lg bg-white p-6 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem className=" flex w-full flex-col">
              <FormLabel className="text-lg font-semibold">
                plants stage
              </FormLabel>
              <FormControl>
                <select
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 focus:border-gray-500 focus:outline-none"
                  {...field}
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

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cycleName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-lg font-semibold">
                Cycle name
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="week"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-lg font-semibold">week</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={createCycle.isLoading}
        >
          {createCycle.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
