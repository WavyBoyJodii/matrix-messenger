"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import getAuthToken from "@/lib/getAuthToken";
import axios from "axios";
import { NewAiChatReturn } from "@/lib/types";

export default function NewChatButton({ myId }: { myId: number }) {
  const router = useRouter();

  const goToAiChat = async () => {
    const token = await getAuthToken();
    try {
      const result = await axios.post<NewAiChatReturn>(
        "https://messengerbackend-production-d50f.up.railway.app/users/ai/new",
        { userId: myId },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      // console.log(
      //   `logging result of New Ai Chat button ${JSON.stringify(result.data)}`,
      // );
      router.push(`/ai/${result.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      className=" w-1/2 flex place-self-center rounded-lg"
      onClick={goToAiChat}
    >
      <p className=" text-xs  md:text-sm">
        {" "}
        <span className=" hidden sm:inline-flex">Ai</span> Chat
      </p>
    </Button>
  );
}
