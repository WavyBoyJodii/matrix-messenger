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
  if (chats.length > 1) {
    chats.sort((chatA, chatB) => {
      // console.log(`logging chat a in chatlist ${JSON.stringify(chatA)}`);
      if (!chatA.message[0]) {
        return 0;
      }
      if (!chatB.message[0]) {
        return 0;
      }
      const latestMessageA = chatA.message[0];
      const latestMessageB = chatB.message[0];

      return (
        new Date(latestMessageB.timestamp).getTime() -
        new Date(latestMessageA.timestamp).getTime()
      );
    });
  }
  useEffect(() => {
    pusher.subscribe(`chats-${myId}`);

    chats.forEach((chat) => {
      pusher.subscribe(`messages-${chat.id}-${myId}`);
    });

    function addToChats(newchat: PusherChats) {
      // console.log(`logging newChat from pusher ${JSON.stringify(newchat)}`);
      const chatObj = JSON.parse(newchat.chat) as Chat;
      console.log(`logging chatObj ${JSON.stringify(chatObj)}`);

      const chatIndex = chats.findIndex((chat) => chat.id === chatObj.id);
      if (chatIndex !== -1) {
        setChats((prevChats) => [
          ...prevChats.slice(0, chatIndex),
          chatObj,
          ...prevChats.slice(chatIndex + 1),
        ]);
      } else {
        setChats((prevChats) => [...prevChats, chatObj]);
      }
    }

    pusher.bind("mychats", addToChats);

    return () => {
      pusher.unsubscribe(`chats-${myId}`);
      chats.forEach((chat) => {
        pusher.unsubscribe(`messages-${chat.id}-${myId}`);
      });
      pusher.unbind("mychats", addToChats);
    };
  }, [chats, myId]);

  useEffect(() => {
    async function importChats() {
      const trueChats = await getChats(myId);
      if (trueChats) {
        setChats(trueChats);
      } else return;
    }
    importChats();
  }, [myId]);

  return (
    <div className=" flex flex-col">
      <h4 className=" text-sm text-center">Chats</h4>
      <ScrollArea className=" h-64 w-full ">
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
