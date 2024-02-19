"use client";

import { Suspense, type ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";

type DashboardProps = {
  main: ReactNode;
  aside: ReactNode;
};

export const Dashboard = ({ main, aside }: DashboardProps) => {
  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <Skeleton className="h-96 w-full animate-pulse shadow-lg">
                    <h1 className="sr-only">Loading...</h1>
                  </Skeleton>

                  <Skeleton className="h-96 w-full animate-pulse shadow-lg">
                    <h1 className="sr-only">Loading...</h1>
                  </Skeleton>
                </div>
              }
            >
              {main}
            </Suspense>
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-border px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {aside}
      </aside>
    </>
  );
};
