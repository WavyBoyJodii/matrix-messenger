import FriendDisplay from "@/components/FriendDisplay";
import Requests from "@/components/Requests";
import getFriendRequests from "@/lib/getFriendRequests";
import getMyId from "@/lib/getMyId";

export default async function RequestsPage() {
  const requests = await getFriendRequests();
  const myId = await getMyId();

  return (
    <div className="min-w-full min-h-full flex flex-col">
      <div className=" flex justify-center p-10 h-24 ">
        <h1 className=" text-4xl font-semibold">Friend Requests</h1>
      </div>
      <Requests initialRequests={requests} myId={myId} />
    </div>
  );
}
