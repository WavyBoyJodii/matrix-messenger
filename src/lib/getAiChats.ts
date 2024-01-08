"use server";

import { cookies } from "next/headers";
import type { AiChat } from "./types";
import getMyId from "./getMyId";

export default async function getAiChats() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const myId = await getMyId();
  const result = await fetch(
    `https://messengerbackend-production-d50f.up.railway.app/users/ai/chats/${myId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
    },
  );
  console.log(`logging status of aiChats return ${result.status}`);
  if (result.status === 500) {
    return null;
  }
  const chats = (await result.json()) as AiChat[];

  // console.log(`logging chat in get chat ${JSON.stringify(chat)}`);

  return chats;
}
