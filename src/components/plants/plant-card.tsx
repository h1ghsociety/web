import { type Plant } from "@/interface/Plant";
import { format } from "date-fns";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { type Timestamp } from "firebase-admin/firestore";
import { Badge } from "../ui/badge";
import { PlantImageDialog } from "./plant-image-dialog";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export const PlantCard = ({ plant }: { plant: Plant }) => {
  const normalizeTimestamp = (timestamp: Timestamp) => {
    return timestamp as unknown as {
      _seconds: number;
      _nanoseconds: number;
    };
  };

  const formattedDate = format(
    new Date(normalizeTimestamp(plant.createdAt)._seconds * 1000),
    "HH:mm - PPP",
  );

  return (
    <Card
      key={plant.uid}
      className="flex h-max flex-col justify-between space-y-8 rounded-lg shadow-lg"
    >
      <CardHeader>
        <p className="text-xl font-semibold">{plant.name}</p>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted">{plant.strain}</p>
          <Badge>{plant.seed_type}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Carousel>
          <CarouselContent className="-ml-1 flex h-56 max-h-[700px]">
            {plant.album_url.map((url, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <PlantImageDialog
                  plant={plant}
                  currentUrl={url}
                  currentIdx={idx}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
            <p className="text-md font-semibold">{plant.author.displayName}</p>

            <p className="text-sm text-muted">{formattedDate}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
