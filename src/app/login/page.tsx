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
      console.log(result);
      setCookie(result.data.token);
      toast({
        description: `${result.data.username} has succesfully logged in`,
      });
      setTimeout(() => {
        router.push("/");
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
    <Container>
      {" "}
      <div className=" h-screen flex justify-center items-center">
        {" "}
        <div className=" w-1/3 h-1/2 p-10 flex flex-col gap-5 justify-center ">
          <h1 className=" text-lg text-center">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
  );
}
