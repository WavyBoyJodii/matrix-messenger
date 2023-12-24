import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getAuth from "./lib/getAuth";

const protectedRoutes = ["/add-friend", "/chat", "/friend-list", "/requests"];

export default async function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const valid = await getAuth();
    console.log(valid);
    if (valid === false) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}
