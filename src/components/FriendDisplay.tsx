import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RequestFriendButton from "./RequestFriendButton";
import AddFriendButton from "./AddFriendButton";
import MessageFriendButton from "./MessageFriendButton";
import RemoveFriendButton from "./RemoveFriendButton";

interface FriendDisplayProps {
  friend: User;
  request?: boolean;
  add?: boolean;
  list?: boolean;
}

export default function FriendDisplay({
  friend,
  request,
  add,
  list,
}: FriendDisplayProps) {
  return (
    <div className=" h-12 grid grid-cols-3 items-center place-self-center gap-1 p-3 w-2/5">
      <Avatar className=" h-10 w-10 place-self-center">
        <AvatarImage src={friend.profile_photo} />
        <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <h3 className=" text-base font-semibold">{friend.username}</h3>
      {friend && add ? (
        <RequestFriendButton friend={friend} />
      ) : request ? (
        <div className=" flex gap-3 items-center">
          <AddFriendButton friend={friend} />
          <RemoveFriendButton friend={friend} />
        </div>
      ) : (
        <div className=" flex gap-3 items-center">
          <MessageFriendButton friend={friend} />
          <RemoveFriendButton friend={friend} />
        </div>
      )}
    </div>
  );
}
