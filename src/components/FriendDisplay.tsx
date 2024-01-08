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
    <div className=" h-fit gap-4 grid grid-cols-3 items-center place-self-center md:gap-2 p-1  md:p-3 w-auto">
      <Avatar className=" h-10 w-10 place-self-center">
        <AvatarImage src={friend.profile_photo} />
        <AvatarFallback>{friend.username.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <h3 className=" text-sm md:text-base font-semibold">{friend.username}</h3>
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
