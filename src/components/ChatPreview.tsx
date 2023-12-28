import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getMyId from "@/lib/getMyId";
import type { Chat } from "@/lib/types";
import { DateTime } from "luxon";

export default async function ChatPreview({ chat }: { chat: Chat }) {
  const lastMessageDate = new Date(chat.message[0].timestamp);
  const lastMessageTime = DateTime.fromJSDate(lastMessageDate).toLocaleString(
    DateTime.TIME_SIMPLE,
  );
  const myId = await getMyId();

  return (
    <div className=" w-20 h-12 flex gap-4">
      <Avatar className=" h-10 w-10">
        <AvatarImage
          src={
            myId === chat.user_id1
              ? chat.user1.profile_photo
              : chat.user2.profile_photo
          }
        />
        <AvatarFallback>
          {myId === chat.user_id1
            ? chat.user1.username.substring(0, 1)
            : chat.user2.username.substring(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className=" text-base font-semibold">
          {myId === chat.user_id1 ? chat.user1.username : chat.user2.username}
        </h3>
        <p className=" text-xs text-gray-700 truncate">
          {chat.message[0].body}
        </p>
      </div>
      <p className=" text-xs">{lastMessageTime}</p>
    </div>
  );
}
