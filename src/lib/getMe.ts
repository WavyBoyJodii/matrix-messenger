"use server";

import { cookies } from "next/headers";
import type { User } from "@/lib/types";

export default async function getMe() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  const result = await fetch(
    "https://messengerbackend-production-d50f.up.railway.app/users/me",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );

  const me = (await result.json()) as User;

  return me;
}
