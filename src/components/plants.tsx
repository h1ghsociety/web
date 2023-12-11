import React from "react";
import { CreateCycle } from "./create-cycle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "./ui/button";
import { CreatePlant } from "./create-plant";

const Plants = async () => {
  const session = await getServerAuthSession();
  const sessionUserId = session?.user.id;

  const getLatest = await api.plant.getLatest.query();
  return (
    <>
      {getLatest.length < 0 ? (
        <CreatePlant userId={sessionUserId} />
      ) : (
        <>
          <CreatePlant userId={sessionUserId} />
          {getLatest.map((a) => (
            <>
              <div>
                <Button>Add plants</Button>
                <p>{a.seed_type}</p>
                <p>{a.strain}</p>
                <p>{a.uid}</p>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Plants;
