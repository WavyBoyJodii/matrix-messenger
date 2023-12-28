import ChatHeader from "@/components/ChatHeader";
import Chat from "@/components/Chat";
import getMyId from "@/lib/getMyId";
import getUser from "@/lib/getUser";

export default async function ChatPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "nochat") {
    return <div>No Chats Yet</div>;
  }

  const chatParticipants = params.slug.split("--");
  const myId = await getMyId();
  const me = await getUser(myId);

  return (
    <>
      <ChatHeader
        id={
          chatParticipants[0] === me.id.toString()
            ? Number(chatParticipants[1])
            : Number(chatParticipants[0])
        }
      />
      <Chat
        chatId={params.slug}
        friendId={
          chatParticipants[0] === me.id.toString()
            ? chatParticipants[1]
            : chatParticipants[0]
        }
      />
    </>
  );
}
