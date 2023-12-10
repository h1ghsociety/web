import { type ReactNode } from "react";

export const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">{children}</div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-muted/20 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        aside
      </aside>
    </>
  );
};
