"use client";
import { useEffect, useState, useCallback } from "react";

import introduceError from "@/lib/introduceError";
import { initialUserCount, paginationStep } from "@/lib/settings";
import { generateUser } from "@/lib/userGenerator";
import { Countries, User } from "@/types";
import CPanel from "@/components/CPanel";
import UserTable from "@/components/UserTable";
const MainPage = () => {
  const [country, setCountry] = useState<Countries>("es");
  const [seed, setSeed] = useState("0");
  const [mistakes, setMistakes] = useState("0.00");
  const [users, setUsers] = useState<User[]>([]);

  const getUsersList = useCallback(
    (start: number, end: number) => {
      const newUsers: User[] = [];

      for (let i = start; i < end; i++) {
        const currentSeed = seed + i;
        const currentUser = generateUser(currentSeed, country);
        const newUser = introduceError(
          currentUser,
          mistakes,
          currentSeed,
          country
        );

        newUsers.push(newUser);
      }

      setUsers((prev) => [...prev, ...newUsers]);
    },
    [seed, country, mistakes]
  );

  useEffect(() => {
    setUsers([]);
    getUsersList(0, initialUserCount);
  }, [seed, country, mistakes, getUsersList]);

  const loadNewUsers = useCallback(() => {
    const isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      getUsersList(users.length, users.length + paginationStep);
    }
  }, [users.length, getUsersList]);

  useEffect(() => {
    window.addEventListener("scroll", loadNewUsers);

    return () => {
      window.removeEventListener("scroll", loadNewUsers);
    };
  }, [loadNewUsers]);

  return (
    <>
      <CPanel
        mistakes={mistakes}
        seed={seed}
        setCountry={setCountry}
        setMistakes={setMistakes}
        setSeed={setSeed}
        users={users}
      />
      <UserTable users={users} />
    </>
  );
};

export default MainPage;
