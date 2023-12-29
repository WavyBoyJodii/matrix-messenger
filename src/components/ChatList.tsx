import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ChatPreview from "./ChatPreview";
import getChats from "@/lib/getChats";
import getMyId from "@/lib/getMyId";

export default async function ChatList() {
  const myId = await getMyId();
  const chats = await getChats(myId);

  return (
    <div className=" flex flex-col">
      <h4 className=" text-sm text-center">Chats</h4>
      <ScrollArea className=" h-80 w-full ">
        <div className=" p-4">
          {chats &&
            chats.map((chat) => (
              <div key={chat.chatId}>
                <ChatPreview
                  chat={chat}
                  messages={chat.message.length > 0 ? true : false}
                />
                <Separator className="my-2" />
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
