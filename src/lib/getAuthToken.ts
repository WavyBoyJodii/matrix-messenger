"use server";

import { cookies } from "next/headers";

export default async function getAuthToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");
  return token;
}
