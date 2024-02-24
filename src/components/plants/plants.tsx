"use client";

import React from "react";
import { api } from "@/trpc/react";

import { PlantCard } from "./plant-card";

const Plants = () => {
  const { data: plants, isLoading } = api.plant.getLatest.useQuery();

  if (isLoading) return <p>Loading...</p>;

  if (!plants) return null;

  return (
    <div className="space-y-4">
      {plants.length > 0 ? (
        <>
          {plants.map((plant) => (
            <PlantCard key={plant.uid} plant={plant} />
          ))}
        </>
      ) : (
        <p className="text-muted">No plants found</p>
      )}
    </div>
  );
};

export default Plants;
