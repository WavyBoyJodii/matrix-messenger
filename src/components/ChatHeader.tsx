import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getUser from "@/lib/getUser";

export default async function ChatHeader({ id }: { id: string }) {
  const user = await getUser(id);

  return (
    <div className="flex justify-between backdrop-filter backdrop-blur-md bg-opacity-50 border-b-2 border-gray-400">
      <div className="flex gap-4 items-center px-3 py-1">
        <Avatar>
          <AvatarImage src={user.profile_photo} />
          <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col justify-center items-center">
          <p>{user.username}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
