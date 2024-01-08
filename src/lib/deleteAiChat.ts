"use server";

import { cookies } from "next/headers";
import type { AiChat } from "./types";
import axios from "axios";

export default async function deleteAiChat(chatId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const result = await axios.delete(
    `https://messengerbackend-production-d50f.up.railway.app/users/ai/chat/${chatId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );
  const chat = (await result.data) as AiChat;
  // console.log(`logging chat in get chat ${JSON.stringify(chat)}`);

  return chat;
}
