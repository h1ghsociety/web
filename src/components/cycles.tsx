import React from "react";
import { CreateCycle } from "./create-cycle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

const Cycles = async () => {
  const session = await getServerAuthSession();
  const sessionUserId = session?.user.id;

  const getLatest = await api.cycle.getLatest.query();
  return (
    <div className="space-y-4">
      {getLatest.length < 0 ? (
        <CreateCycle userId={sessionUserId} />
      ) : (
        <>
          <CreateCycle userId={sessionUserId} />
          {getLatest.map((cycle) => {
            if (sessionUserId === cycle.userId)
              return (
                <div
                  key={cycle.uid}
                  className="space-y-2 rounded-lg bg-white p-4 shadow"
                >
                  <p className="text-gray-700">
                    Cycle name : {cycle.cycleName}
                  </p>
                  <p className="text-gray-700">stage : {cycle.stage}</p>
                  <p className="text-gray-700">week : {cycle.week}</p>
                  <p>plants : {}</p>
                </div>
              );
          })}
        </>
      )}
    </div>
  );
};

export default Cycles;
