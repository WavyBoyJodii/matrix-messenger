"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AiChat } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";
import deleteAiChat from "@/lib/deleteAiChat";
import { useRouter, usePathname } from "next/navigation";

export default function AiChatPreview({
  aiChat,
  messages,
}: {
  aiChat: AiChat;
  messages: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  //   const deleteChat = async () => {
  //     const result = await deleteAiChat(aiChat.id);
  //     setTimeout(() => {
  //       router.push(pathname);
  //     }, 3000);
  //   };
  return (
    <div className=" flex items-center">
      <Link href={`/ai/${aiChat.id}`}>
        <div className=" w-full h-12 flex gap-4 items-center">
          <Avatar className=" h-10 w-10">
            <AvatarImage src="/chatGptIcon.png" />
            <AvatarFallback>Ai</AvatarFallback>
          </Avatar>
          <div className="flex gap-1 hidden w-32 sm:flex">
            <h3 className=" text-base font-semibold  truncate">
              {messages && aiChat.aiMessage[0].content}
            </h3>
          </div>
        </div>
      </Link>
      {/* <Button variant="outline" size="icon" onClick={deleteChat}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button> */}
    </div>
  );
}
