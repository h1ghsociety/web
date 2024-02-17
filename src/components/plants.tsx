import React from "react";
import { CreateCycle } from "./create-cycle";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Button } from "./ui/button";
import { CreatePlant } from "./create-plant";
import Image from "next/image";
import { Box } from "lucide-react";
import { Form } from "./ui/form";
import { Separator } from "@radix-ui/react-separator";

const Plants = async () => {
  const session = await getServerAuthSession();
  const sessionUserId = session?.user.id;

  const getLatest = await api.plant.getLatest.query();
  getLatest.map((a) => console.log("a", a.userId));
  const getLatestCycle = await api.cycle.getLatest.query();

  return (
    <div className="space-y-4">
      {getLatest.length < 0 ? (
        <CreatePlant userId={sessionUserId} getCycles={getLatestCycle} />
      ) : (
        <>
          <CreatePlant userId={sessionUserId} getCycles={getLatestCycle} />
          <Button> minhas plantacoes</Button>
          {getLatest.map((plant) => {
            if (plant.userId === sessionUserId)
              return (
                <div
                  key={plant.uid}
                  className="space-y-2 rounded-lg border  bg-white p-4 shadow"
                >
                  <p className="text-gray-700">Ciclo : {plant.cycle}</p>
                  <p className="text-gray-700">
                    Tipo de semente : {plant.seed_type}
                  </p>
                  <p className="text-gray-700">
                    Strain da planta : {plant.strain}
                  </p>
                  {/* Uncomment and update the Image component as per your requirement */}
                  {/* <Image
                  alt="album"
                  className="w-full h-auto rounded-lg"
                  //src={plant.album_url}
                /> */}
                </div>
              );
          })}
        </>
      )}
    </div>
  );
};

export default Plants;
