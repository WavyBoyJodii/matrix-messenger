import Image from "next/image";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-gradient-to-bl from-fuchsia-200 via-white to-rose-200 flex flex-col min-h-screen">
      <Header />{" "}
      <main className=" flex-1 h-full flex flex-col justify-center ">
        <Container>
          <div className="flex flex-col text-center items-center">
            <h1 className=" text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl">
              Chat With Friends, Chat With Ai <br />
              Whats The Difference?!
            </h1>
            <p className=" mt-6 text-lg leading-8 text-gray-600">
              Messenger With Built in ChatBot for when your Friends are too Busy
            </p>
            <Link href="/register">
              <Button variant="default" className=" mt-8">
                Sign Up
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}
