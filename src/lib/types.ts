import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Must Be atleast 3 characters long")
    .toLowerCase(),
  password: z.string().min(7, "Password must be atleast 7 characters long"),
});

export type ZLoginSchema = z.infer<typeof loginSchema>;

export const newUserSchema = z.object({
  username: z
    .string()
    .min(3, "Must Be atleast 3 characters long")
    .toLowerCase(),
  password: z.string().min(7, "Password must be atleast 7 characters long"),
  email: z
    .string()
    .min(1, { message: "user must have email" })
    .email("this is not a valid email address"),
  firstName: z.string().min(1, "Must input a first name"),
  lastName: z.string().min(1, "Must input a last name"),
});

export type ZNewUserSchema = z.infer<typeof newUserSchema>;

export const requestedUserSchema = z.object({
  requestedUser: z
    .string()
    .min(1, "Must Be atleast 1 character long")
    .toLowerCase(),
});

export type ZRequestedUserSchema = z.infer<typeof requestedUserSchema>;

export interface AxiosErrorMessage {
  message: string;
}

export interface NegativeResponseType {
  info: AxiosErrorMessage;
}

export interface NoUserChats {
  message: string;
}

export interface PositiveLoginResponseType {
  username: string;
  userId: number;
  token: string;
}

export interface PositiveAcceptRequestType {
  message: string;
}

export interface PositiveDeleteFriendResponseType {
  message: string;
}

export interface PositiveChatResponseType {}

export type User = {
  id: number;
  username: string;

  email: string;

  profile_photo: string;
};

export type Message = {
  id: number;
  chat_id: number;
  body: string;
  timestamp: Date;
  user_id: number;
};

export type PusherMessage = {
  message: string;
};

export type Chat = {
  chatId: string;
  user_id1: number;
  user_id2: number;
  id: number;
  created_at: Date;
  message: Message[];
  user1: User;
  user2: User;
};

export type NewChatReturn = {
  chat: Chat;
};
export type PusherChats = {
  chat: string;
};

export type Friends = {
  status: "pending" | "accepted" | "rejected";
  user_id1: number;
  user_id2: number;
  friend: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_photo: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_photo: string;
  };
};
