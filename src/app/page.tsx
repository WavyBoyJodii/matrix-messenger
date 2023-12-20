import Image from "next/image";
import Container from "@/components/Container";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Container>
        <div className="flex flex-col gap-10 md:gap-20 items-center">
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-center justify-self-center text-white">
            Make starting up your sessions a breeze with mp3 Starter
          </h1>
        </div>
      </Container>
    </main>
  );
}
