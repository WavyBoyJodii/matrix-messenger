import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiMessage, Chat, Message, User } from "@/lib/types";

export default function AiMessages({
  user,
  aiMessage,
  multiple,
}: {
  aiMessage: AiMessage;
  multiple: boolean;
  user: User;
}) {
  return (
    <div
      className={
        aiMessage.role === "user"
          ? " bg-blue-400 flex w-fit max-w-sm rounded-lg p-2 gap-2 place-self-end items-center"
          : " flex w-fit max-w-sm rounded-lg bg-slate-200 p-2 gap-2 items-center"
      }
    >
      {multiple === false ? (
        <Avatar className=" h-10 w-10">
          <AvatarImage
            src={
              aiMessage.role === "user"
                ? user.profile_photo
                : "/chatGptIcon.png"
            }
          />
          <AvatarFallback>
            {aiMessage.role === "user" ? user.username.substring(0, 1) : "Ai"}
          </AvatarFallback>
        </Avatar>
      ) : null}
      <div className=" flex flex-col gap-1">
        <p>{aiMessage.content}</p>
      </div>
    </div>
  );
}
