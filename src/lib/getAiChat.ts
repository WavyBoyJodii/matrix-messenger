"use server";

import { cookies } from "next/headers";
import type { AiChat } from "./types";

export default async function getAiChat(chatId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const result = await fetch(
    `https://messengerbackend-production-d50f.up.railway.app/users/ai/chat/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );
  if (result.status === 500) {
    return null;
  }
  if (result.status === 404) {
    return null;
  }

  const chat = (await result.json()) as AiChat;
  // console.log(`logging chat in get chat ${JSON.stringify(chat)}`);

  return chat;
}
