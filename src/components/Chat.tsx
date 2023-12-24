import getChat from "@/lib/getChat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Chat({
  chatId,
  friendId,
}: {
  chatId: string;
  friendId: string;
}) {
  const chat = await getChat(chatId);
  const messages = chat.message.reverse();
  const friendNumId = Number(friendId);

  return (
    <div className=" flex flex-col min-w-full min-h-full">
      {messages.map((message) => (
        <div className=" flex w-20" key={message.id}>
          <Avatar className=" h-10 w-10">
            <AvatarImage
              src={
                chat.user_id1 === friendNumId
                  ? chat.user1.profile_photo
                  : chat.user2.profile_photo
              }
            />
            <AvatarFallback>
              {chat.user_id1 === friendNumId
                ? chat.user1.username.substring(0, 1)
                : chat.user2.username.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  );
}
