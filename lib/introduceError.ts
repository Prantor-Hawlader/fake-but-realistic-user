import seedRandom, { PRNG } from "seedrandom";

import { userErrorKeys } from "./settings";
import { selectArrayItem } from "./userGenerator";
import fakeData from "./fakeData";

import { Countries, User } from "@/types";

const selectMistakeLocation = (user: User, seedRandomize: PRNG) => {
  const mistakeKey =
    userErrorKeys[Math.floor(seedRandomize() * userErrorKeys.length)];
  const mistakeValue = user[mistakeKey].split("");

  return { mistakeKey, mistakeValue };
};

const removeCharacter = (user: User, seed: string, seedRandomize: PRNG) => {
  const mistake = selectMistakeLocation(user, seedRandomize);
  const characterToRemove = selectArrayItem(
    seedRandomize,
    mistake.mistakeValue
  );
  const characterIndex = mistake.mistakeValue.indexOf(characterToRemove);

  mistake.mistakeValue.splice(characterIndex, 1);

  return {
    ...user,
    [mistake.mistakeKey]: mistake.mistakeValue.join(""),
  };
};

const insertCharacter = (
  user: User,
  seed: string,
  seedRandomize: PRNG,
  country: Countries
) => {
  const mistake = selectMistakeLocation(user, seedRandomize);
  const randomValueIndex = Math.round(
    0 - 0.5 + seedRandomize() * (mistake.mistakeValue.length - 0 + 1)
  );
  const letters = fakeData[country].letters.split("");
  const randomLetterIndex = Math.round(
    0 - 0.5 + seedRandomize() * (letters.length - 0 + 1)
  );

  mistake.mistakeValue.splice(randomValueIndex, 0, letters[randomLetterIndex]);

  return {
    ...user,
    [mistake.mistakeKey]: mistake.mistakeValue.join(""),
  };
};

const swapCharacters = (user: User, seed: string, seedRandomize: PRNG) => {
  const mistake = selectMistakeLocation(user, seedRandomize);
  const alteredValue = mistake.mistakeValue;
  const randomValueIndex = Math.round(
    0 - 0.5 + seedRandomize() * (alteredValue.length - 0 + 1)
  );
  const tempHolder = alteredValue[randomValueIndex];

  alteredValue[randomValueIndex] = alteredValue[randomValueIndex + 1];
  alteredValue[randomValueIndex + 1] = tempHolder;

  return {
    ...user,
    [mistake.mistakeKey]: mistake.mistakeValue.join(""),
  };
};

const introduceError = (
  user: User,
  mistakes: string,
  seed: string,
  country: Countries
) => {
  const seedRandomize = seedRandom(seed);
  const totalMistakes = Number(mistakes);
  let errorCount = Math.floor(totalMistakes);

  if (totalMistakes > 1) {
    const mistakeProbability = totalMistakes % errorCount;

    if (seedRandomize() < mistakeProbability) {
      errorCount++;
    }
  } else if (totalMistakes > 0 && totalMistakes < 1) {
    errorCount = seedRandomize() < totalMistakes ? 1 : 0;
  }
  let alteredUser = user;

  for (let i = 0; i < errorCount; i++) {
    if (seedRandomize() < 0.33) {
      alteredUser = removeCharacter(alteredUser, seed, seedRandomize);
    } else if (seedRandomize() < 0.66) {
      alteredUser = insertCharacter(alteredUser, seed, seedRandomize, country);
    } else {
      alteredUser = swapCharacters(alteredUser, seed, seedRandomize);
    }
  }

  return alteredUser;
};

export default introduceError;
