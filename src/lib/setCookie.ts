"use server";

import { cookies } from "next/headers";

export default async function setCookie(jwt: string) {
  cookies().set("auth", jwt);
}
