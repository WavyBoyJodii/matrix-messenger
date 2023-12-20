import Container from "@/components/Container";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sm: flex sm: justify-between py-3 px-4 font-supreme sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-10 items-center justify-between w-full">
          <div className="flex items-center">
            {/* need to add Link element when Router is setup*/}
            <Link href={"/"}>
              {" "}
              <h1 className="text-2xl font-bold tracking-tight">
                <span className=" text-transparent bg-indigo-500 bg-clip-text">
                  Matrix
                </span>{" "}
                Messenger
              </h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center justify-items-center space-x-4 lg:space-x-6 hidden md:block">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="default">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
