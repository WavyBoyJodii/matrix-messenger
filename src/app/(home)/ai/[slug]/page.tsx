import Chat from "@/components/Chat";
import getMyId from "@/lib/getMyId";
import getUser from "@/lib/getUser";
import MessageInput from "@/components/MessageInput";
import getChat from "@/lib/getChat";
import AiHeader from "@/components/AiHeader";
import AiChat from "@/components/AiChat";
import getAiChat from "@/lib/getAiChat";
import { notFound } from "next/navigation";

export default async function AiChatPage({
  params,
}: {
  params: { slug: string };
}) {
  const myId = await getMyId();
  const user = await getUser(myId);
  const aiChatId = Number(params.slug);
  // console.log(`logging aichatid in ai chat page ${aiChatId}`);
  const aiChat = await getAiChat(aiChatId);

  if (aiChat === null) {
    return notFound();
  }

  return (
    <>
      <AiHeader />
      {aiChat && (
        <AiChat
          user={user}
          aiChatId={aiChatId}
          initialMessages={aiChat.aiMessage}
          myId={myId}
        />
      )}
    </>
  );
}
