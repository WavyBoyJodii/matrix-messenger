import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getMe from "@/lib/getMe";

export default async function UserInfo() {
  const me = await getMe();

  return (
    <div className=" w-20 h-12 flex gap-4 p-3">
      <Avatar className=" h-10 w-10">
        <AvatarImage src={me.profile_photo} />
        <AvatarFallback>{me.username.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className=" text-base font-semibold">{me.username}</h3>
        <p className=" text-xs text-gray-700 truncate">{me.email}</p>
      </div>
    </div>
  );
}
