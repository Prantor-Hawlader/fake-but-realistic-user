import React from "react";

import CountrySelect from "./CoutrySelect";
import Mistaker from "./Mistaker";
import CSVGenerator from "./CSVGenerator";
import Seeder from "./Seeder";

import { Countries, SetState, User } from "@/types";

interface ControlsProps {
  setCountry: SetState<Countries>;
  seed: string;
  setSeed: SetState<string>;
  mistakes: string;
  setMistakes: SetState<string>;
  users: User[];
}

const CPanel = ({
  setCountry,
  seed,
  setSeed,
  mistakes,
  setMistakes,
  users,
}: ControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <CountrySelect setCountry={setCountry} />
      <Mistaker mistakes={mistakes} setMistakes={setMistakes} />
      <Seeder seed={seed} setSeed={setSeed} />
      <CSVGenerator users={users} />
    </div>
  );
};

export default CPanel;
