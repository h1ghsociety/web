import React from "react";
import { api } from "@/trpc/server";

import { CreatePlant } from "./create-plant";
import { Card } from "./ui/card";
import { format } from "date-fns";
import Image from "next/image";

const Plants = async () => {
  const plants = await api.plant.getLatest.query();

  return (
    <div className="space-y-4">
      <CreatePlant />

      {plants.length > 0 ? (
        <>
          {plants.map((plant) => (
            <Card
              key={plant.uid}
              className="space-y-8 rounded-lg bg-white p-4 shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-xl font-semibold">{plant.strain}</p>
                  <p className="text-gray-500">{plant.seed_type}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                {plant.album_url.map((url) => (
                  <Image
                    key={url}
                    src={url}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover"
                    alt={plant.strain}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Image
                  src={plant.author.avatarUrl}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                  alt={plant.author.displayName}
                />

                <div>
                  <p className="text-md font-semibold">
                    {plant.author.displayName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {format(plant.createdAt.toDate(), "PPP")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </>
      ) : (
        <p className="text-gray-700">No plants found</p>
      )}
    </div>
  );
};

export default Plants;
