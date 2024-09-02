import { Country, TableHeader, UserKeys } from "@/types";

const initialUserCount = 20;

const paginationStep = 10;

const userRepeatLimit = 10000000;

const countryList: Country[] = [
  {
    id: "es",
    title: "ESP",
    uniqueKey: "1",
  },
  {
    id: "de",
    title: "DE",
    uniqueKey: "2",
  },
  {
    id: "us",
    title: "USA",
    uniqueKey: "3",
  },
];

const cityPrefixes = ["Ciudad", "Villa", "Pueblo", "Localidad"];

const tableHeaders: TableHeader[] = [
  {
    id: "1",
    headingName: "#",
  },
  {
    id: "2",
    headingName: "Id",
  },
  {
    id: "3",
    headingName: "Full name",
  },
  {
    id: "4",
    headingName: "Address",
  },
  {
    id: "5",
    headingName: "Phone number",
  },
];

const csvHeaders = [
  { label: "id", key: "id" },
  { label: "Full name", key: "name" },
  { label: "Address", key: "address" },
  { label: "Phone number", key: "phone" },
];

const userErrorKeys: UserKeys[] = ["name", "address", "phone"];

export {
  initialUserCount,
  paginationStep,
  userRepeatLimit,
  countryList,
  cityPrefixes,
  tableHeaders,
  csvHeaders,
  userErrorKeys,
};
