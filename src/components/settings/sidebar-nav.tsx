"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({
              variant: item.title === "Sign out" ? "destructive" : "sidebar",
            }),
            pathname === item.href
              ? "bg-background text-foreground hover:bg-background hover:text-foreground"
              : "hover:bg-background hover:text-foreground",
            item.title === "Sign out"
              ? "text-foreground hover:bg-destructive"
              : "",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
