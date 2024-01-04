"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function NewChatButton() {
  const router = useRouter();

  const goToAiChat = () => {
    router.push("/ai");
  };
  return (
    <Button
      className=" w-1/2 flex place-self-center rounded-lg"
      onClick={goToAiChat}
    >
      <p className=" text-xs  md:text-sm">
        {" "}
        <span className=" hidden sm:inline-flex">New</span> Chat
      </p>
    </Button>
  );
}
