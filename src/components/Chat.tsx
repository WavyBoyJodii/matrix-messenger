"use client";

import Message from "./Message";
import MessageInput from "./MessageInput";
import { Chat } from "@/lib/types";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";

export default function Chat({
  chat,
  friendId,
  myId,
}: {
  chat: Chat;
  friendId: string;
  myId: number;
}) {
  const messages = chat.message;
  console.log(`logging messages array ${JSON.stringify(messages)}`);
  const friendNumId = Number(friendId);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

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
            <Message
              chat={chat}
              friendId={friendNumId}
              message={message}
              multiple={multiple}
              myId={myId}
              key={message.id}
              time={lastMessageTime}
            />
          );
        })}
      </div>
      <div ref={lastMessageRef}></div>
    </div>
  );
}
