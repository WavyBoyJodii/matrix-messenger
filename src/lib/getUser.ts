"use server";

import { cookies } from "next/headers";
import type { User } from "@/lib/types";

export default async function getUser(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  const result = await fetch(
    `https://messengerbackend-production-d50f.up.railway.app/users/find/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );

  const user = (await result.json()) as User;

  return user;
}
