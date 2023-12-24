import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  ZRequestedUserSchema,
  requestedUserSchema,
  NegativeResponseType,
} from "@/lib/types";
import { SetStateAction, Dispatch } from "react";
import axios from "axios";

interface SearchFriendProps {
  setFriend: Dispatch<SetStateAction<User | null>>;
}

export default function SearchFriend({ setFriend }: SearchFriendProps) {
  const form = useForm<ZRequestedUserSchema>({
    resolver: zodResolver(requestedUserSchema),
    defaultValues: {
      requestedUser: "",
    },
  });

  const onSubmit = async (data: ZRequestedUserSchema) => {
    try {
      const result = await axios.post<User>(
        "https://messengerbackend-production-d50f.up.railway.app/users/find",
        data,
      );
      console.log(result);
      setFriend(result.data);
    } catch (error) {
      if (axios.isAxiosError<NegativeResponseType>(error)) {
        console.log(error);
        const responseString = error.response?.data.info.message;
        form.setError("requestedUser", {
          type: "server",
          message: responseString,
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex w-1/2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 sm:space-y-8 w-full flex place-content-center"
        >
          <FormField
            control={form.control}
            name="requestedUser"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className=" flex place-content-center">
                  Friend Username
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage className=" flex place-content-center" />
              </FormItem>
            )}
          />
          <div className="flex gap-16 justify-between place-self-center">
            <Button type="submit" className="flex place-self-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
