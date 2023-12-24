import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getAuth from "./lib/getAuth";

export const config = {
  matcher: ["/add-friend", "/chat/:path*", "/friend-list", "/requests"],
};

// const protectedRoutes = [
//   "/add-friend",
//   "/chat/*/*",
//   "",
//   "",
// ];
// const entrancePages = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const valid = await getAuth();
  console.log(`logging middleware auth response ${valid}`);
  if (valid === false) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}
