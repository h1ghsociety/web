"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Session } from "next-auth";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  email: "",
  bio: "",
  urls: [{ value: "" }],
};

interface ProfileFormProps {
  session: Session;
}

export const ProfileForm = ({ session }: ProfileFormProps) => {
  const { data: profileData } = api.user.getUserProfile.useQuery({
    uid: session.user.id,
  });
  const { mutate: updateProfile, isLoading: isUpdating } =
    api.user.updateUserProfile.useMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });
  const { toast } = useToast();

  const onSubmit = (data: ProfileFormValues) => {
    if (form.formState.isSubmitting) return;

    updateProfile(
      { uid: session.user.id, data },
      {
        onSuccess: () => {
          toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            ),
          });
        },
      },
    );
  };

  useEffect(() => {
    if (profileData) {
      form.reset({
        username: profileData.username,
        email: profileData.email,
        bio: profileData.bio,
        urls: profileData.urls || [{ value: "" }],
      });
    }
  }, [profileData, form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="myusername123" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public email address can be seen by anyone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a short bio to tell others about your growing journey and
                interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2Icon className="mr-1 h-4 w-4 animate-spin" /> Updating
                Profile
              </>
            ) : (
              "Add URL"
            )}
          </Button>
        </div>

        <Button type="submit" disabled={!form.formState.isDirty}>
          {isUpdating ? (
            <>
              <Loader2Icon className="mr-1 h-4 w-4 animate-spin" /> Updating
              profile
            </>
          ) : (
            "Update profile"
          )}
        </Button>
      </form>
    </Form>
  );
};
