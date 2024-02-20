import React from "react";
import { api } from "@/trpc/server";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { format } from "date-fns";

const Cycles = async () => {
  const latestCycles = await api.cycle.getLatest.query();

  return (
    <div className="space-y-4">
      {latestCycles.length > 0 ? (
        latestCycles.map((cycle) => (
          <Card key={cycle.uid} className="h-80 space-y-8 rounded-lg shadow-lg">
            <CardHeader>
              <h2 className="text-2xl font-bold">{cycle.name}</h2>
            </CardHeader>

            <CardFooter>
              <div className="flex flex-col">
                <div>
                  <p className="font-bold">Created at: </p>
<<<<<<< HEAD
                  <p className="text-muted">
=======
                  <p className="text-gray-700">
>>>>>>> 5b75b5484518470921b5d998d3582759ef846302
                    {format(cycle.createdAt.toDate(), "PPP")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Author: </p>
<<<<<<< HEAD
                  <p className="text-muted">{cycle.author.displayName}</p>
=======
                  <p className="text-gray-700">{cycle.author.displayName}</p>
>>>>>>> 5b75b5484518470921b5d998d3582759ef846302
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
