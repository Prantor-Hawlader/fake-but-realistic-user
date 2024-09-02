"use client";

import React, { memo } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { SetState } from "@/types";

interface SeedInputProps {
  seed: string;
  setSeed: SetState<string>;
}

const Seeder = ({ seed, setSeed }: SeedInputProps) => {
  const updateSeed = (newSeed: string) => {
    if (Number(newSeed) < 0) {
      setSeed("0");
    } else if (Number(newSeed) > 9999999999) {
      setSeed("9999999999");
    } else {
      setSeed(newSeed);
    }
  };

  const generateSeed = () => {
    const min = 0;
    const max = 9999999999;
    const randomSeed = Math.round(min - 0.5 + Math.random() * (max - min + 1));

    setSeed(randomSeed.toString());
  };

  return (
    <>
      <Input
        className="w-[150px]"
        label="Seed"
        size="sm"
        type="number"
        value={seed}
        onChange={({ target }) => updateSeed(target.value)}
      />
      <Button color="warning" onClick={generateSeed}>
        Random seed
      </Button>
    </>
  );
};

export default memo(Seeder);
