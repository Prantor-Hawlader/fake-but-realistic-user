type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Countries = "es" | "de" | "us";

type UserKeys = "id" | "name" | "address" | "phone";

type User = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

type Country = {
  id: Countries;
  title: string;
  uniqueKey: string;
};

type TableHeader = {
  id: string;
  headingName: string;
};

export type { SetState, Countries, UserKeys, User, Country, TableHeader };
