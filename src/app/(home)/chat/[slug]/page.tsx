import ChatHeader from "@/components/ChatHeader";
import Chat from "@/components/Chat";
import getMyId from "@/lib/getMyId";
import getUser from "@/lib/getUser";
import MessageInput from "@/components/MessageInput";
import getChat from "@/lib/getChat";

export default async function ChatPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "nochat") {
    return <div>No Chats Yet</div>;
  }

  const chatParticipants = params.slug.split("--");
  const chatId = params.slug;
  console.log(`logging chat id in chat page ${chatId}`);
  const myId = await getMyId();
  const chat = await getChat(chatId);

  return (
    <>
      <ChatHeader
        id={
          chatParticipants[0] === myId.toString()
            ? Number(chatParticipants[1])
            : Number(chatParticipants[0])
        }
      />
      <Chat
        chat={chat}
        friendId={
          chatParticipants[0] === myId.toString()
            ? chatParticipants[1]
            : chatParticipants[0]
        }
        myId={myId}
      />
      <MessageInput chatId={chat.id} />
    </>
  );
}
