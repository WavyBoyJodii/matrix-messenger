"use client";

import FriendDisplay from "@/components/FriendDisplay";
import getFriendRequests from "@/lib/getFriendRequests";
import { pusher } from "@/lib/pusher";
import { Friends } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Requests({
  requests,
  myId,
}: {
  requests: Friends[];
  myId: number;
}) {
  return (
    <div className=" h-full w-full flex justify-center items-center">
      {requests &&
        requests.map((request) => {
          if (request.user.id === myId) {
            return (
              <FriendDisplay
                friend={request.friend}
                key={request.friend.id}
                request={true}
              />
            );
          } else {
            return (
              <FriendDisplay
                friend={request.user}
                key={request.user.id}
                request={true}
              />
            );
          }
        })}
    </div>
  );
}
