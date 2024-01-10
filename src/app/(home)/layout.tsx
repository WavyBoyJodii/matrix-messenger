import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const metadata: Metadata = {
  title: "Matrix Messenger",
  description: "Chat with friends, Chat with AI",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sheet>
          <SheetTrigger className="sm:hidden">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[400px]">
            <Sidebar className=" flex w-auto" />
          </SheetContent>
        </Sheet>
        <Sidebar
          className={" hidden sm:flex w-28  sm:w-52 md:w-64 border-r-2"}
        />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
