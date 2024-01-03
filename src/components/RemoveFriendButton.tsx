"use client";

import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import getMyId from "@/lib/getMyId";
import {
  AxiosErrorMessage,
  PositiveDeleteFriendResponseType,
  User,
} from "@/lib/types";
import getAuthToken from "@/lib/getAuthToken";
import { useRouter } from "next/navigation";

export default function RemoveFriendButton({ friend }: { friend: User }) {
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
      const result = await axios.delete<PositiveDeleteFriendResponseType>(
        `https://messengerbackend-production-d50f.up.railway.app/users/friend/${friend.id}--${myId}`,
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
      className=" flex gap-2"
      variant="destructive"
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
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <p className=" hidden sm:block">Remove</p>
    </Button>
  );
}
