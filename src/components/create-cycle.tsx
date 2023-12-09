"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "./ui/button";

export function CreateCycle({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const [stage, setStage] = useState<string>(
    "seedling" || "vegetating" || "flowering" || "drying" || "curing",
  );
  console.log("userId", userId);
  const [cycleName, setCycleName] = useState("");
  const [week, setWeek] = useState("");

  const createCycle = api.cycle.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setStage("");
      setCycleName("");
      setWeek("");
    },
  });

  const options = ["seedling", "vegetating", "flowering", "drying", "curing"];
  if (!userId) return null;
  return (
    <form
      className="flex flex-col justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        createCycle.mutate({
          userId,
          stage,
          cycleName,
          week,
        });
      }}
    >
      <select
        placeholder="Stage"
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Cycle Name"
        value={cycleName}
        onChange={(e) => setCycleName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Week"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
      />
      <Button type="submit" disabled={createCycle.isLoading}>
        {createCycle.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
