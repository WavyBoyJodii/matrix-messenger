"use client";

import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import getMyId from "@/lib/getMyId";
import { AxiosErrorMessage, Chat, NewChatReturn, User } from "@/lib/types";
import getAuthToken from "@/lib/getAuthToken";
import { useRouter } from "next/navigation";

export default function MessageFriendButton({ friend }: { friend: User }) {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async () => {
    const token = await getAuthToken();
    const myId = await getMyId();

    try {
      const result = await axios.post<NewChatReturn>(
        "https://messengerbackend-production-d50f.up.railway.app/users/chat",
        { friendId: friend.id, userId: myId },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      // console.log(
      //   `logging result of message friend button ${JSON.stringify(
      //     result.data,
      //   )}`,
      // );

      router.push(`/chat/${result.data.chat.chatId}`);
    } catch (error) {
      if (axios.isAxiosError<AxiosErrorMessage>(error)) {
        console.log(error);
        const responseString = error.response?.data.message;
        toast({
          description: `${responseString}`,
        });
      } else {
        console.log(error);
      }
    }
  };
  return (
    <Button type="submit" className=" flex gap-2" onClick={onSubmit}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>{" "}
      <p className=" hidden lg:block">Message</p>
    </Button>
  );
}
