import { Button } from "./ui/button";

export default function NewChatButton() {
  return (
    <Button className=" w-1/2 flex place-self-center rounded-lg">
      <p className=" text-xs  md:text-sm">
        {" "}
        <span className=" hidden sm:inline-flex">New</span> Chat
      </p>
    </Button>
  );
}
