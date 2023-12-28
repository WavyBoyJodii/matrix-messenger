import FriendDisplay from "@/components/FriendDisplay";
import getFriendsList from "@/lib/getFriendsList";
import getMyId from "@/lib/getMyId";

export default async function FriendsListPage() {
  const friends = await getFriendsList();
  const myId = await getMyId();

  return (
    <div className="min-w-full min-h-full flex flex-col">
      <div className=" flex justify-center p-10 h-24 ">
        <h1 className=" text-4xl font-semibold">Friends List</h1>
      </div>
      <div className=" h-full w-full flex justify-center items-center">
        {friends &&
          friends.map((friend) => {
            if (friend.user.id === myId) {
              return (
                <FriendDisplay
                  friend={friend.friend}
                  key={friend.friend.id}
                  list={true}
                />
              );
            } else {
              return (
                <FriendDisplay
                  friend={friend.user}
                  key={friend.user.id}
                  list={true}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
