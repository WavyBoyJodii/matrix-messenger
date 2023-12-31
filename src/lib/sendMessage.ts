import axios from "axios";
import getAuthToken from "./getAuthToken";
import getMyId from "./getMyId";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { NegativeResponseType } from "./types";
import { useToast } from "@/components/ui/use-toast";

export const sendMessage = async (
  input: string,
  chatId: number,
  setInput: Dispatch<SetStateAction<string>>,
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>,
) => {
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
      console.log(responseString);
    }
  }
};
