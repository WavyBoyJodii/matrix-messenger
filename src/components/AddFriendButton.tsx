"use client";

import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import getMyId from "@/lib/getMyId";
import {
  AxiosErrorMessage,
  PositiveAcceptRequestType,
  User,
} from "@/lib/types";
import getAuthToken from "@/lib/getAuthToken";
import { useRouter } from "next/navigation";

export default function AddFriendButton({ friend }: { friend: User }) {
  const { toast } = useToast();
  const router = useRouter();
  //   console.log(
  //     `logging friend id in add friend button component ${JSON.stringify(
  //       friend,
  //     )}`,
  //   );
  const onSubmit = async () => {
    const token = await getAuthToken();
    const myId = await getMyId();

    try {
      const result = await axios.put<PositiveAcceptRequestType>(
        "https://messengerbackend-production-d50f.up.railway.app/users/friend/",
        { friendId: friend.id, userId: myId },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );
      toast({
        description: `${result.data.message}`,
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
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
    <Button
      type="submit"
      className=" flex gap-2 bg-green-700 hover:bg-green-400"
      onClick={onSubmit}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      Accept
    </Button>
  );
}
