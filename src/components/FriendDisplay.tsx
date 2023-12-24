import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddFriendButton from "./AddFriendButton";

interface FriendDisplayProps {
  friend: User;
}

export default function FriendDisplay({ friend }: FriendDisplayProps) {
  return (
    <div className=" w-20 h-12 flex gap-4 p-3">
      <Avatar className=" h-10 w-10">
        <AvatarImage src={friend.profile_photo} />
        <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <h3 className=" text-base font-semibold">{friend.username}</h3>
      <AddFriendButton username={friend.username} />
    </div>
  );
}
