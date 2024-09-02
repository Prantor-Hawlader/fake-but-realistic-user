import Fakerator from "fakerator";
import seedRandom, { PRNG } from "seedrandom";

import { Countries, User } from "../types";

import { cityPrefixes, countryList } from "./settings";
import fakeData from "./fakeData";

const generateFakerator = (seed: string, country: Countries) => {
  const fakeratorInstance = Fakerator(`${country}-${country.toUpperCase()}`);

  // @ts-ignore
  fakeratorInstance.seed(Number(seed));

  return fakeratorInstance;
};

const selectArrayItem = (randomGenerator: PRNG, array: string[]) => {
  const index = Math.floor(randomGenerator() * array.length);

  return array[index];
};

const getCountryPrefix = (country: Countries) => {
  const countryDetails = countryList.find((item) => item.id === country);

  return countryDetails?.uniqueKey;
};

const generateId = (seed: string, country: Countries) => {
  const countryPrefix = getCountryPrefix(country);
  const fakeratorInstance = generateFakerator(countryPrefix + seed, country);

  return fakeratorInstance.random.hex(8);
};

const generateName = (
  seed: string,
  country: Countries,
  randomGenerator: PRNG
) => {
  const { names } = generateFakerator(seed, country);
  const fullName = {
    male: `${names.lastNameM()} ${names.firstNameM()}`,
    female: `${names.lastNameF()} ${names.firstNameF()}`,
  };

  const gender = randomGenerator() > 0.5 ? "male" : "female";

  if (country !== "es") {
    return fullName[gender];
  }

  const spanishMiddleName = {
    male: `${selectArrayItem(randomGenerator, fakeData.es.middleName)}`,
    female: `${selectArrayItem(randomGenerator, fakeData.es.middleName)}`,
  };

  return `${fullName[gender]} ${spanishMiddleName[gender]}`;
};

const generateCity = (
  seed: string,
  country: Countries,
  randomGenerator: PRNG
) => {
  const fakeratorInstance = generateFakerator(seed, country);

  if (country !== "es") return fakeratorInstance.address.city();

  return `${selectArrayItem(randomGenerator, cityPrefixes)} ${fakeratorInstance.address.city()}`;
};

const generateStreet = (
  seed: string,
  country: Countries,
  city: string,
  randomGenerator: PRNG
) => {
  const fakeratorInstance = generateFakerator(seed, country);
  const streetName = `, ${fakeratorInstance.address.streetName()}`;

  if (city.includes("Pueblo" || "Villa" || "Localidad")) {
    return randomGenerator() > 0.1 ? "" : streetName;
  }

  return streetName;
};

const generateHouse = (
  seed: string,
  country: Countries,
  randomGenerator: PRNG
) => {
  const min = 1;
  const max = 999;
  const houseNumber = `${Math.round(min - 0.5 + randomGenerator() * (max - min + 1))}`;
  const flatNumber = `${Math.round(
    min - 0.5 + seedRandom(houseNumber)() * (max - min + 1)
  )}`;
  const flatSuffix = randomGenerator() > 0.5 ? "" : flatNumber;

  if (country !== "es")
    return `${houseNumber}${flatSuffix ? `-${flatSuffix}` : ""}`;

  return `Calle ${houseNumber}${flatSuffix ? `, Piso ${flatSuffix}` : ""}`;
};

const generatePhone = (seed: string, country: Countries) => {
  const fakeratorInstance = generateFakerator(seed, country);
  let phoneNumber = fakeratorInstance.phone.number();

  phoneNumber = phoneNumber.split(" x")[0].replace(/\./g, "-");

  return country === "es" ? `+34${phoneNumber}` : phoneNumber;
};

const generateUser = (seed: string, country: Countries): User => {
  const randomGenerator = seedRandom(seed);
  const houseRandomGenerator = seedRandom(seed + country);
  const city = generateCity(seed, country, randomGenerator);
  const street = generateStreet(seed, country, city, randomGenerator);
  const house = generateHouse(seed, country, houseRandomGenerator);
  const address = `${city}${street}, ${house}`;

  return {
    id: generateId(seed, country),
    name: generateName(seed, country, randomGenerator),
    phone: generatePhone(seed, country),
    address,
  };
};

export { generateUser, selectArrayItem };
