"use client";

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
import {
  newUserSchema,
  ZNewUserSchema,
  NegativeResponseType,
} from "@/lib/types";
import Container from "@/components/Container";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function RegisterPage() {
  const form = useForm<ZNewUserSchema>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      photo: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const onSubmit = async (data: ZNewUserSchema) => {
    try {
      console.log("beginning submission");
      const result = await axios.post(
        "https://messengerbackend-production-d50f.up.railway.app/sign-up",
        data,
      );
      console.log(result.data);
      toast({
        description: `${result.data.message}`,
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError<NegativeResponseType>(error)) {
        console.log(error.response);
        console.log(error.message);
        toast({
          description: `${error.message}`,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="bg-gradient-to-bl from-fuchsia-200 via-white to-rose-200 min-h-screen">
      <Header />
      <Container>
        {" "}
        <div className=" flex justify-center items-center">
          {" "}
          <div className=" w-1/3 h-1/2 p-10 flex flex-col gap-5 justify-center">
            <h1 className=" text-lg text-center">Create a new account</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
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
                        <Input required {...field} />
                      </FormControl>
                      <FormDescription>Input Password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Rockstar@GTA.com"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Input email address here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Your First Name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Your Last Name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" hidden">Photo Url</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className=" hidden"
                          required={false}
                        />
                      </FormControl>
                      <FormDescription className="hidden">
                        input a link to a photo of you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
