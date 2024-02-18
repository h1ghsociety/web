import { Suspense, type ReactNode } from "react";
import { Card } from "./ui/card";

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
                <div className="h-svh space-y-4 overflow-y-hidden">
                  <Card className="h-96 w-full animate-pulse bg-muted/75 p-4 shadow-lg">
                    <h1 className="sr-only">Loading...</h1>
                  </Card>

                  <Card className="h-96 w-full animate-pulse bg-muted/75 p-4 shadow-lg">
                    <h1 className="sr-only">Loading...</h1>
                  </Card>
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
