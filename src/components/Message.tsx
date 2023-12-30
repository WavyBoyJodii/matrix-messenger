import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat, Message } from "@/lib/types";

export default async function Message({
  friendId,
  chat,
  message,
  multiple,
  myId,
  time,
}: {
  friendId: number;
  chat: Chat;
  message: Message;
  multiple: boolean;
  myId: number;
  time: string;
}) {
  return (
    <div
      className={
        message.user_id === myId
          ? " bg-blue-400 flex w-fit max-w-sm rounded-lg p-2 gap-2 place-self-end items-center"
          : " flex w-fit max-w-sm rounded-lg bg-slate-200 p-2 gap-2 items-center"
      }
    >
      {multiple === false ? (
        <Avatar className=" h-10 w-10">
          <AvatarImage
            src={
              chat.user_id1 === message.user_id
                ? chat.user1.profile_photo
                : chat.user2.profile_photo
            }
          />
          <AvatarFallback>
            {chat.user_id1 === message.user_id
              ? chat.user1.username.substring(0, 1)
              : chat.user2.username.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
      ) : null}
      <div className=" flex flex-col gap-1">
        <p>{message.body}</p>
        {multiple === false ? (
          <p className=" text-xs text-gray-800">{time}</p>
        ) : null}
      </div>
    </div>
  );
}
