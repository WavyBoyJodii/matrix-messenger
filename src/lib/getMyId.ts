"use server";

import { cookies } from "next/headers";
import type { User } from "@/lib/types";

export default async function getMyId() {
  const cookieStore = cookies();
  const idString = cookieStore.get("user");
  const myId = Number(idString?.value);

  return myId;
}
