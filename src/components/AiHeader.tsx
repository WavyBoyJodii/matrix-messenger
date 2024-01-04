import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AiHeader() {
  return (
    <div className="flex justify-between backdrop-filter backdrop-blur-md bg-opacity-50 border-b-2 border-gray-400">
      <div className="flex gap-4 items-center px-3 py-1">
        <Avatar>
          <AvatarImage src="/chatGptIcon.png" />
          <AvatarFallback>Ai</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col justify-center items-center">
          <p>Chat GPT</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
