"use client";

import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { SetState } from "@/types";

interface MistakesInputProps {
  mistakes: string;
  setMistakes: SetState<string>;
}

const Mistaker = ({ mistakes, setMistakes }: MistakesInputProps) => {
  const [inputMistakes, setInputMistakes] = useState(mistakes);

  const increaseMistakes = () => {
    if (Number(mistakes) < 10) {
      const newMistakes = (Number(mistakes) + 0.25).toFixed(2);

      setMistakes(newMistakes.toString());
      setInputMistakes(newMistakes.toString());
    }
  };

  const decreaseMistakes = () => {
    if (Number(mistakes) > 0) {
      const newMistakes = (Number(mistakes) - 0.25).toFixed(2);

      setMistakes(newMistakes.toString());
      setInputMistakes(newMistakes.toString());
    }
  };

  const checkInputMistakes = (value: string) => {
    if (Number(value) > 1000) {
      setMistakes("1000");
      setInputMistakes("1000");
    } else if (Number(value) < 0) {
      setMistakes("0.00");
      setInputMistakes("");
    } else {
      setMistakes(value);
      setInputMistakes(value);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <h1 className="text-bold text-xl text-pink-600">Error</h1>

      <AiOutlineMinus
        className="cursor-pointer"
        size={20}
        onClick={decreaseMistakes}
      />

      <Input
        className="w-[100px]"
        type="number"
        value={inputMistakes}
        onChange={({ target }) => {
          checkInputMistakes(target.value);
        }}
      />
      <AiOutlinePlus
        className="cursor-pointer"
        size={20}
        onClick={increaseMistakes}
      />
    </div>
  );
};

export default Mistaker;
