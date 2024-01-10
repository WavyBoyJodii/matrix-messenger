"use server";

import { cookies } from "next/headers";

export default async function clearAuthCookie() {
  console.log(`logging clear auth cookie.....`);
  cookies().set("auth", "");
  console.log(`auth cookie should be cleared...`);
}
