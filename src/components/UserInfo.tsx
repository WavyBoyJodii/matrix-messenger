"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getMyId from "@/lib/getMyId";
import getUser from "@/lib/getUser";
import { User } from "@/lib/types";
import { useState, useEffect } from "react";

export default function UserInfo({ className }: { className: string }) {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    async function getAndSet() {
      const myId = await getMyId();
      const user = await getUser(myId);
      setMe(user);
    }
    getAndSet();
  }, []);

  return (
    <>
      {me && (
        <div
          className={`w-full h-20 flex gap-4 p-3 justify-start border-t-2 ${className}`}
        >
          <Avatar className=" h-10 w-10">
            <AvatarImage src={me.profile_photo} />
            <AvatarFallback className=" text-black">
              {`${me.username.substring(0, 1)}`}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block flex flex-col gap-1">
            <h3 className=" text-base font-semibold text-black">
              {`${me.username}`}
            </h3>
            <p className=" text-xs text-gray-700 truncate">{me.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
