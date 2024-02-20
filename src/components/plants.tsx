import React from "react";
import { api } from "@/trpc/server";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "./ui/badge";

const Plants = async () => {
  const plants = await api.plant.getLatest.query();

  console.log("PLANTS", typeof plants[0]?.createdAt);

  return (
    <div className="space-y-4">
      {plants.length > 0 ? (
        <>
          {plants.map((plant) => (
            <Card
              key={plant.uid}
              className="h-96 space-y-8 rounded-lg shadow-lg"
            >
              <CardHeader>
                <p className="text-xl font-semibold">{plant.name}</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted">{plant.strain}</p>
                  <Badge>{plant.seed_type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex space-x-4">
                  {plant.album_url.map((url) => (
                    <Image
                      key={url}
                      src={url}
                      width={112}
                      height={112}
                      className="h-28 w-28 rounded-lg object-cover"
                      alt={plant.strain}
                    />
                  ))}
                </div>
              </CardContent>

              <CardFooter>
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

                    <p className="text-sm text-muted">
                      {format(plant.createdAt.toDate(), "PPP")}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
<<<<<<< HEAD
        <p className="text-muted">No plants found</p>
=======
        <p className="text-gray-700">No plants found</p>
>>>>>>> 5b75b5484518470921b5d998d3582759ef846302
      )}
    </div>
  );
};

export default Plants;
