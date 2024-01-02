"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ChatPreview from "./ChatPreview";
import getChats from "@/lib/getChats";
import getMyId from "@/lib/getMyId";
import { Chat, PusherChats } from "@/lib/types";
import { useEffect, useState } from "react";
import { pusher } from "@/lib/pusher";

export default function ChatList({
  initialChats,
  myId,
}: {
  initialChats: Chat[];
  myId: number;
}) {
  const [chats, setChats] = useState(initialChats);

  useEffect(() => {
    pusher.subscribe(`chats-${myId}`);

    chats.forEach((chat) => {
      pusher.subscribe(`messages-${chat.id}-${myId}`);
    });

    function addToChats(chats: PusherChats) {
      console.log(`logging chats from pusher ${JSON.stringify(chats)}`);
      setChats(chats.chats);
    }

    pusher.bind("mychats", addToChats);

    return () => {
      pusher.unsubscribe(`chats-${myId}`);
      chats.forEach((chat) => {
        pusher.unsubscribe(`messages-${chat.id}-${myId}`);
      });
      pusher.unbind("mychats", addToChats);
    };
  }, []);

  return (
    <div className=" flex flex-col">
      <h4 className=" text-sm text-center">Chats</h4>
      <ScrollArea className=" h-80 w-full ">
        <div className=" p-4">
          {chats &&
            chats.map((chat) => (
              <div key={chat.chatId}>
                <ChatPreview
                  chat={chat}
                  messages={chat.message.length > 0 ? true : false}
                  myId={myId}
                />
                <Separator className="my-2" />
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
