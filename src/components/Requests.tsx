"use client";

import FriendDisplay from "@/components/FriendDisplay";
import getFriendRequests from "@/lib/getFriendRequests";
import { pusher } from "@/lib/pusher";
import { Friends } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Requests({
  initialRequests,
  myId,
}: {
  initialRequests: Friends[];
  myId: number;
}) {
  const [requests, setRequests] = useState(initialRequests);

  useEffect(() => {
    pusher.subscribe(`requests-${myId}`);

    async function updateRequests() {
      const latestRequests = await getFriendRequests();
      console.log(`logging latest requests ${latestRequests}`);
      setRequests(latestRequests);
    }

    pusher.bind("new-request", updateRequests);

    return () => {
      pusher.unsubscribe(`requests-${myId}`);
      pusher.unbind("new-request", updateRequests);
    };
  }, []);
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
