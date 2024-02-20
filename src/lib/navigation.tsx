import { Flower2Icon, HomeIcon, LeafIcon, RefreshCwIcon } from "lucide-react";

export const publicNavigation = [
  { name: "Product", href: "#", icon: LeafIcon, current: false },
];

export const protectedNavigation = [
  { name: "Feed", href: "/feed", icon: HomeIcon, current: true },
  { name: "Cycles", href: "/cycles", icon: RefreshCwIcon, current: false },
  { name: "Plants", href: "/plants", icon: Flower2Icon, current: false },
];
