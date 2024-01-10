"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AiChat, PusherChats } from "@/lib/types";
import { useEffect, useState } from "react";
import { pusher } from "@/lib/pusher";
import AiChatPreview from "./AiChatPreview";
import { SetStateAction, Dispatch } from "react";
import getAiChats from "@/lib/getAiChats";

export default function AiChatList({
  initialChats,
  myId,
}: {
  initialChats: AiChat[];
  myId: number;
}) {
  const [aiChats, setAiChats] = useState(initialChats);

  useEffect(() => {
    pusher.subscribe(`aichats-${myId}`);

    function addToChats(newchat: PusherChats) {
      // console.log(`logging newChat from pusher ${JSON.stringify(newchat)}`);
      const chatObj = JSON.parse(newchat.chat) as AiChat;
      //   console.log(`logging chatObj ${JSON.stringify(chatObj)}`);

      setAiChats((prevChats) => [...prevChats, chatObj]);
    }

    pusher.bind("aichats", addToChats);

    return () => {
      pusher.unsubscribe(`aichats-${myId}`);

      pusher.unbind("aichats", addToChats);
    };
  }, [aiChats, myId]);

  useEffect(() => {
    async function importAiChats() {
      const trueAiChats = await getAiChats();
      if (trueAiChats) {
        setAiChats(trueAiChats);
      } else return;
    }
    importAiChats();
  }, []);

  return (
    <div className=" flex flex-col">
      <h4 className=" text-sm text-center">Ai Chats</h4>
      <ScrollArea className=" h-64 w-full ">
        <div className=" p-4 flex flex-col-reverse">
          {aiChats &&
            aiChats.map((aiChat) => (
              <div key={aiChat.id}>
                {aiChat.aiMessage.length > 0 ? (
                  <AiChatPreview
                    aiChat={aiChat}
                    messages={aiChat.aiMessage.length > 0 ? true : false}
                  />
                ) : null}
                {aiChat.aiMessage.length > 0 ? (
                  <Separator className="my-2" />
                ) : null}
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
