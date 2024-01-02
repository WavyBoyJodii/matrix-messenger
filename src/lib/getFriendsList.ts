"use server";

import axios from "axios";
import getAuthToken from "./getAuthToken";
import getMyId from "./getMyId";
import { Friends } from "./types";

export default async function getFriendsList() {
  const myId = await getMyId();
  const token = await getAuthToken();

  const result = await axios.get(
    `https://messengerbackend-production-d50f.up.railway.app/users/friendslist/${myId}`,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  if (result.status === 404) {
    return null;
  } else {
    const friends = (await JSON.parse(result.data)) as Friends[];
    return friends;
  }
}
