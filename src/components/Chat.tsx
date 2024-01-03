"use client";

import { pusher } from "@/lib/pusher";
import Messages from "./Messages";
import { Chat, Message, PusherMessage } from "@/lib/types";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

export default function Chat({
  chat,
  friendId,
  myId,
  initialMessages,
}: {
  chat: Chat;
  friendId: string;
  myId: number;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  // console.log(`logging messages array ${JSON.stringify(messages)}`);
  const friendNumId = Number(friendId);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    pusher.subscribe(`messages-${chat.id}`);

    function addToMessages(message: PusherMessage) {
      const messageObj = JSON.parse(message.message) as Message;
      console.log(
        `logging messageOBJ from pusher ${JSON.stringify(messageObj)}`,
      );
      setMessages((prev) => [messageObj, ...prev]);
    }

    pusher.bind("new-message", addToMessages);

    return () => {
      pusher.unsubscribe(`messages-${chat.id}`);
      pusher.unbind("new-message", addToMessages);
    };
  }, []);

  return (
    <div className=" h-4/5 overflow-y-auto">
      <div className=" flex flex-col-reverse min-w-full min-h-full  gap-4 p-3 overflow-y-auto">
        {messages.map((message, index) => {
          const multiple =
            messages[index - 1]?.user_id === messages[index].user_id;
          const lastMessageDate = new Date(message.timestamp);
          const lastMessageTime = DateTime.fromJSDate(
            lastMessageDate,
          ).toLocaleString(DateTime.TIME_SIMPLE);
          return (
            <Messages
              chat={chat}
              friendId={friendNumId}
              message={message}
              multiple={multiple}
              myId={myId}
              key={`${message.id}+${message.timestamp}`}
              time={lastMessageTime}
            />
          );
        })}
      </div>
      <div ref={lastMessageRef}></div>
    </div>
  );
}
