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
    <div className=" h-12 flex items-center gap-4 p-3">
      <Avatar className=" h-10 w-10">
        <AvatarImage src={friend.profile_photo} />
        <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <h3 className=" text-base font-semibold">{friend.username}</h3>
      {friend && request ? (
        <RequestFriendButton friend={friend} />
      ) : add ? (
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
