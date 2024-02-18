"use client";

import { useRouter } from "next/navigation";
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
import { Input } from "./ui/input";
import { type CycleDTO, cycleFormSchema } from "../interface/Cycle";
import { useToast } from "./ui/use-toast";
import { Loader2Icon } from "lucide-react";

export function CreateCycle() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CycleDTO>({
    resolver: zodResolver(cycleFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const createCycle = api.cycle.create.useMutation({
    onSuccess: () => {
      router.refresh();

      reset();
    },
  });

  const onSubmit = (values: CycleDTO) => {
    if (isSubmitting) return;

    createCycle.mutate(
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
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cycle name</FormLabel>

              <FormControl>
                <Input placeholder="Enter cycle name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-full gap-2"
          disabled={createCycle.isLoading}
        >
          {createCycle.isLoading ? (
            <>
              Creating <Loader2Icon className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Create cycle"
          )}
        </Button>
      </form>
    </Form>
  );
}
