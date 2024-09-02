"use client";
import { Select, SelectItem } from "@nextui-org/select";

import { countryList } from "@/lib/settings";
import { Countries, SetState } from "@/types";

interface CountrySelectorProps {
  setCountry: SetState<Countries>;
}

const CountrySelect = ({ setCountry }: CountrySelectorProps) => {
  return (
    <>
      <Select
        className="w-[150px]"
        items={countryList}
        label="Select country"
        placeholder="Country"
        size="sm"
      >
        {(item) => (
          <SelectItem key={item.id} onClick={() => setCountry(item.id)}>
            {item.title}
          </SelectItem>
        )}
      </Select>
    </>
  );
};

export default CountrySelect;
