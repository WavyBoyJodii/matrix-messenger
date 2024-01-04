import Chat from "@/components/Chat";
import getMyId from "@/lib/getMyId";
import getUser from "@/lib/getUser";
import MessageInput from "@/components/MessageInput";
import getChat from "@/lib/getChat";
import AiHeader from "@/components/AiHeader";
import AiChat from "@/components/AiChat";

export default async function AiChatPage() {
  const myId = await getMyId();
  const user = await getUser(myId);

  return (
    <>
      <AiHeader />
      <AiChat user={user} />
    </>
  );
}
