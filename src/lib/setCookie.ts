"use server";

import { cookies } from "next/headers";

interface setCookieProps {
  jwt: string;
}

export default async function setCookie({ jwt }: setCookieProps) {
  console.log("logging setCookie is running...");
  cookies().set("auth", jwt);
  console.log("setCookie is complete...");
}
