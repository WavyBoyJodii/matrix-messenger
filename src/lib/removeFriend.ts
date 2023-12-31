import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import getMyId from "@/lib/getMyId";
import {
  AxiosErrorMessage,
  PositiveDeleteFriendResponseType,
  User,
} from "@/lib/types";
import getAuthToken from "@/lib/getAuthToken";

export default async function RemoveFriend({ friend }: { friend: User }) {
  const { toast } = useToast();

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
}
