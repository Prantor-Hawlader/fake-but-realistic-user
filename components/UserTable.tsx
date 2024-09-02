"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";
import { v4 } from "uuid";

import { tableHeaders } from "@/lib/settings";
import { User } from "@/types";

interface UsersTableProps {
  users: User[];
}

const UserTable = ({ users }: UsersTableProps) => {
  return (
    <Table className="mt-4">
      <TableHeader columns={tableHeaders}>
        {(heading) => (
          <TableColumn key={heading.id}>{heading.headingName}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {users?.map((user, index) => (
          <TableRow key={v4()}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.address}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
