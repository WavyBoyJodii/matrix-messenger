"use server";

import axios from "axios";
import getAuthToken from "./getAuthToken";
import getMyId from "./getMyId";
import { Friends } from "./types";

export default async function getFriendRequests() {
  const myId = await getMyId();
  const token = await getAuthToken();

  const result = await axios.get(
    `https://messengerbackend-production-d50f.up.railway.app/users/friend/${myId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  // console.log(
  //   `logging result.json to see what it holds in get friend requests ${JSON.stringify(
  //     result.data,
  //   )}`,
  // );

  const requests = (await JSON.parse(result.data)) as Friends[];
  return requests;
}
