export interface User {
  uid: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  username: string;
  bio: string;
  dob: string;
  language: UserLanguage;
  theme: UserTheme;
  urls: UserURL[];
  createdAt: string;
  updatedAt: string;
}

export interface UserURL {
  value: string;
}

export type UserTheme = "light" | "dark";

export type UserLanguage = "EN" | "ES" | "PT";
