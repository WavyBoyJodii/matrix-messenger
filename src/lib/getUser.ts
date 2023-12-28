"use server";

import { cookies } from "next/headers";
import type { User } from "@/lib/types";
import axios from "axios";

export default async function getUser(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  const { data } = await axios.get<User>(
    `https://messengerbackend-production-d50f.up.railway.app/users/find/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  //   const result = await fetch(
  //     `https://messengerbackend-production-d50f.up.railway.app/users/find/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token?.value}`,
  //       },
  //       cache: "no-store",
  //     },
  //   );

  //   const user = result.body() as User;

  return data;
}
