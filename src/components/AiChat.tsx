"use client";

import { AiMessage, NegativeResponseType, Roles, User } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import AiMessages from "./AiMessages";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import getAuthToken from "@/lib/getAuthToken";
import { useToast } from "@/components/ui/use-toast";

export default function AiChat({ user }: { user: User }) {
  const [aiMessages, setAiMessages] = useState<AiMessage[] | null>(null);
  const [input, setInput] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [aiMessages]);

  const sendMessage = async () => {
    if (!input) return;

    try {
      const token = await getAuthToken();

      const result = await axios.post<AiMessage>(
        "https://messengerbackend-production-d50f.up.railway.app/users/ai",
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );

      if (aiMessages === null) {
        setAiMessages([{ role: Roles.user, content: input }, result.data]);
      } else {
        setAiMessages([
          ...aiMessages,
          { role: Roles.user, content: input },
          result.data,
        ]);
      }
      setInput("");

      textareaRef.current?.focus();
    } catch (error) {
      if (axios.isAxiosError<NegativeResponseType>(error)) {
        console.log(error);
        const responseString = error.response?.data.info.message;
        toast({
          description: `${responseString}`,
        });
      }
    }
  };

  return (
    <>
      <div className=" h-4/5 overflow-y-auto">
        <div className=" flex flex-col min-w-full min-h-full  gap-4 p-3 overflow-y-auto">
          {aiMessages &&
            aiMessages.map((aiMessage, index) => {
              const multiple =
                aiMessages[index - 1]?.role === aiMessages[index].role;
              return (
                <AiMessages
                  aiMessage={aiMessage}
                  multiple={multiple}
                  user={user}
                  key={index}
                />
              );
            })}
        </div>
        <div ref={lastMessageRef}></div>
      </div>
      <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 flex gap-2">
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 ">
          <TextareaAutosize
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message...`}
            className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 p-2"
          />
        </div>

        <Button onClick={sendMessage} type="submit">
          Post
        </Button>
      </div>
    </>
  );
}
