import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matrix Messenger",
  description: "Chat with friends, Chat with AI",
};

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className={"flex w-28  sm:w-52 md:w-64 border-r-2"} />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
