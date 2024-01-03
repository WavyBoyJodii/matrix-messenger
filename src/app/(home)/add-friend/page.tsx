"use client";

import FriendDisplay from "@/components/FriendDisplay";
import SearchFriend from "@/components/SearchFriend";
import { User } from "@/lib/types";
import { useState } from "react";

export default function AddFriendPage() {
  const [friend, setFriend] = useState<User | null>(null);

  return (
    <div className="min-w-full min-h-full flex flex-col">
      <div className=" flex justify-center p-10 h-24 ">
        <h1 className=" text-2xl sm:text-4xl font-semibold">Add A Friend</h1>
      </div>
      <SearchFriend setFriend={setFriend} />
      <div className=" h-full w-full flex justify-center items-center">
        {friend && <FriendDisplay friend={friend} add={true} />}
      </div>
    </div>
  );
}
