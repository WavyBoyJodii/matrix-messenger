"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import getAuthToken from "@/lib/getAuthToken";
import { NegativeResponseType } from "@/lib/types";
import getMyId from "@/lib/getMyId";

interface ChatInputProps {
  chatId: number;
}

export default function MessageInput({ chatId }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input) return;

    try {
      const token = await getAuthToken();
      const myId = await getMyId();
      await axios.post(
        "https://messengerbackend-production-d50f.up.railway.app/users/message",
        { message: input, chatId: chatId, userId: myId },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
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

        {/* <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        ></div> */}
      </div>

      <Button onClick={sendMessage} type="submit">
        Post
      </Button>
    </div>
  );
}
