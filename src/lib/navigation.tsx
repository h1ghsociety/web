import { Flower2Icon, HomeIcon, RefreshCwIcon } from "lucide-react";

export const navigation = [
  { name: "Feed", href: "/", icon: HomeIcon, current: true },
  { name: "Cycles", href: "/cycles", icon: RefreshCwIcon, current: false },
  { name: "Plants", href: "/plants", icon: Flower2Icon, current: false },
];
