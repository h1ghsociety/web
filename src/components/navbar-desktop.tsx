import { publicNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { buttonVariants } from "./ui/button";

export const NavbarDesktop = () => {
  return (
    <nav
      className="mx-auto hidden max-w-7xl items-center justify-between p-6 lg:flex lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">High Society</span>

          <Image
            className="h-8 w-auto"
            height={32}
            width={32}
            src="/Logo.svg"
            alt="High Society"
          />
        </a>
      </div>

      <div className="hidden lg:flex lg:gap-x-12">
        {publicNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-semibold leading-6"
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/api/auth/signin" className={cn(buttonVariants())}>
          Log in
        </a>
      </div>
    </nav>
  );
};
