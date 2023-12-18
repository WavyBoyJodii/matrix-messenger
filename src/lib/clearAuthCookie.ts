"use server";

import { cookies } from "next/headers";

export default async function clearAuthCookie() {
  cookies().delete("auth");
}
