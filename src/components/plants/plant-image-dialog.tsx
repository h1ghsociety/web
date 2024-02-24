import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { type Plant } from "@/interface/Plant";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const PlantImageDialog = ({
  plant,
  currentUrl,
  currentIdx,
}: {
  plant: Plant;
  currentUrl: string;
  currentIdx: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          key={currentUrl}
          src={currentUrl}
          width={256}
          height={256}
          className="aspect-square h-40 w-full rounded-lg object-cover object-center hover:cursor-pointer hover:brightness-75 lg:h-48"
          alt={plant.strain}
        />
      </DialogTrigger>

      <DialogContent className="px-4 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{plant.name}</DialogTitle>
          <DialogDescription>{plant.strain}</DialogDescription>
        </DialogHeader>

        <Carousel
          opts={{
            startIndex: currentIdx,
          }}
        >
          <CarouselContent className="flex max-h-[700px] space-x-4">
            {plant.album_url.map((url) => (
              <CarouselItem>
                <Image
                  key={url}
                  src={url}
                  width={1280}
                  height={1024}
                  alt={plant.strain}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
