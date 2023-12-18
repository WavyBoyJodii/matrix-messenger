"use server";

import { cookies } from "next/headers";
import axios from "axios";

export default async function getAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  const result = await fetch(
    "https://messengerbackend-production-d50f.up.railway.app/users/verify",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const response = await result.status;
  console.log(response);
  if (response === 401) {
    return false;
  } else {
    return true;
  }
}
