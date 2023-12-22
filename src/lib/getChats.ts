"use server";

import { cookies } from "next/headers";
import type { Chat } from "@/lib/types";

export default async function getChats() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  const result = await fetch(
    "https://messengerbackend-production-d50f.up.railway.app/users/chats",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );

  const chats = (await result.json()) as Chat[];

  return chats;
}
