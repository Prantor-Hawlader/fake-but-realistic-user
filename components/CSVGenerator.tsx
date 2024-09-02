"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { CSVLink } from "react-csv";

import { User } from "@/types";
import { csvHeaders } from "@/lib/settings";

interface CsvButtonProps {
  users: User[];
}

const CSVGenerator = ({ users }: CsvButtonProps) => {
  return (
    <Button color="success">
      <CSVLink
        data={users}
        enclosingCharacter=" "
        filename="user-data.csv"
        headers={csvHeaders}
      >
        Export CSV
      </CSVLink>
    </Button>
  );
};

export default CSVGenerator;
