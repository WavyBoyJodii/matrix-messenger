"use client";

import {
  loginSchema,
  PositiveLoginResponseType,
  ZLoginSchema,
  NegativeResponseType,
} from "@/lib/types";
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
import axios from "axios";
import Container from "@/components/Container";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import setCookie from "@/lib/setCookie";
import Header from "@/components/Header";
import getChats from "@/lib/getChats";
import setUserId from "@/lib/setUserId";

export default function LoginPage() {
  const form = useForm<ZLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: ZLoginSchema) => {
    try {
      const result = await axios.post<PositiveLoginResponseType>(
        "https://messengerbackend-production-d50f.up.railway.app/login",
        data,
      );
      // console.log(`logging result of login api call ${JSON.stringify(result)}`);
      await setCookie({ jwt: result.data.token });
      await setUserId(result.data.userId);
      const chats = await getChats(result.data.userId);
      toast({
        description: `${result.data.username} has succesfully logged in`,
      });
      // console.log(chats);
      setTimeout(() => {
        if (chats.length === 0) {
          router.push(`/chat/nochat`);
        } else {
          router.push(`/chat/${chats[0].chatId}`);
        }
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError<NegativeResponseType>(error)) {
        console.log(error);
        const responseString = error.response?.data.info.message;
        if (responseString?.includes("username")) {
          form.setError("username", {
            type: "server",
            message: responseString,
          });
        } else {
          form.setError("password", {
            type: "server",
            message: responseString,
          });
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-bl from-fuchsia-200 via-white to-rose-200 min-h-screen">
      <Header />
      <Container>
        {" "}
        <div className="flex justify-center items-center">
          {" "}
          <div className=" w-full p-2  sm:w-1/2  h-1/2 md:p-10 flex flex-col gap-5 justify-center ">
            <h1 className=" text-lg text-center">Login</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>
                      <FormDescription>Input Password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
