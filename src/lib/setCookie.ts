"use server";

import { cookies } from "next/headers";

interface setCookieProps {
  jwt: string;
}

export default async function setCookie({ jwt }: setCookieProps) {
  cookies().set("auth", jwt);
}
