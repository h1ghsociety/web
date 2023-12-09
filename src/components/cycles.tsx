import React from "react";
import { CreateCycle } from "./create-cycle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "./ui/button";

const Cycles = async () => {
  const session = await getServerAuthSession();
  const sessionUserId = session?.user.id;

  const getLatest = await api.cycle.getLatest.query();
  return (
    <>
      {getLatest.length < 0 ? (
        <CreateCycle userId={sessionUserId} />
      ) : (
        <>
          <CreateCycle userId={sessionUserId} />
          {getLatest.map((a) => (
            <>
              <div>
                <Button>Add plants</Button>
                <p>{a.cycleName}</p>
                <p>{a.stage}</p>
                <p>{a.week}</p>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Cycles;
