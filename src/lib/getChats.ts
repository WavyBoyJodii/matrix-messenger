"use server";
export const revalidate = 0;
import { cookies } from "next/headers";
import type { Chat, NoUserChats } from "@/lib/types";
import axios from "axios";

export default async function getChats(userId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  const result = await axios.get(
    `https://messengerbackend-production-d50f.up.railway.app/users/chats/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );
  console.log(`logging result of getchats: ${result.status}`);
  const chats = (await result.data) as Chat[];

  return chats;
}
