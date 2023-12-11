import { z } from "zod";

export interface User {
  uid: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  username: string;
  bio: string;
  dob: Date;
  language: UserLanguage;
  urls: UserURL[];
  createdAt: string;
  updatedAt: string;
}

export interface UserURL {
  value: string;
}

export type UserLanguage = "EN" | "ES" | "PT";

export const UserLanguageSchema = z.union([
  z.literal("EN"),
  z.literal("ES"),
  z.literal("PT"),
]);
export const UserThemeSchema = z.union([z.literal("light"), z.literal("dark")]);
