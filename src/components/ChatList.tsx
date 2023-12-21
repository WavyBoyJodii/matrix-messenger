import { cookies } from "next/headers";
import type { Chat } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ChatPreview from "./ChatPreview";

export default async function ChatList() {
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

  return (
    <div className=" flex flex-col">
      <h4 className=" text-sm">Chats</h4>
      <ScrollArea className=" h-80 w-52 ">
        <div className=" p-4">
          {chats.map((chat) => (
            <>
              <ChatPreview key={chat.chatId} chat={chat} />
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
