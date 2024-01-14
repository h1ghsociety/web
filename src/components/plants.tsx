import React from "react";
import { CreateCycle } from "./create-cycle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "./ui/button";
import { CreatePlant } from "./create-plant";
import Image from "next/image";

const Plants = async () => {
  const session = await getServerAuthSession();
  const sessionUserId = session?.user.id;

  const getLatest = await api.plant.getLatest.query();
  getLatest.map((a) => console.log("a", a.userId));
  const getLatestCycle = await api.cycle.getLatest.query();

  return (
    <>
      {getLatest.length < 0 ? (
        <CreatePlant userId={sessionUserId} getCycles={getLatestCycle} />
      ) : (
        <>
          <CreatePlant userId={sessionUserId} getCycles={getLatestCycle} />
          {getLatest.map((plant) => {
            if (plant.userId === sessionUserId)
              return (
                <div>
                  <Button>Add plants</Button>
                  <p>{plant.seed_type}</p>
                  <p>{plant.strain}</p>
                  <p>{plant.uid}</p>
                  {/* <Image
                    alt="album"
                    width="1"
                    height="2"
                    src={[plant.album_url[0]]}
                  /> */}
                </div>
              );
          })}
        </>
      )}
    </>
  );
};

export default Plants;
