"use server";

import { cookies } from "next/headers";
import type { Chat } from "./types";

export default async function getChat(chatId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const result = await fetch(
    `https://messengerbackend-production-d50f.up.railway.app/users/chat/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );
  const chat = (await result.json()) as Chat;

  return chat;
}
