import React from "react";
import { CreateCycle } from "./create-cycle";
import { api } from "@/trpc/server";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { format } from "date-fns";

const Cycles = async () => {
  const latestCycles = await api.cycle.getLatest.query();

  return (
    <div className="space-y-4">
      <CreateCycle />

      {latestCycles.length > 0 ? (
        latestCycles.map((cycle) => (
          <Card
            key={cycle.uid}
            className="space-y-2 rounded-lg bg-white p-4 shadow"
          >
            <CardHeader>
              <h2 className="text-2xl font-bold">{cycle.name}</h2>
            </CardHeader>

            <CardFooter>
              <div className="flex flex-col">
                <div>
                  <p className="font-bold">Created at: </p>
                  <p className="text-gray-700">
                    {format(cycle.createdAt.toDate(), "PPP")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Author: </p>
                  <p className="text-gray-700">{cycle.author.displayName}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No cycles yet. Create the first one!</p>
      )}
    </div>
  );
};

export default Cycles;
