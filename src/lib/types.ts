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
  photo: z.string().url("must be a valid url").optional(),
});

export type ZNewUserSchema = z.infer<typeof newUserSchema>;

export interface AxiosErrorMessage {
  message: string;
}

export interface NegativeResponseType {
  info: AxiosErrorMessage;
}

export interface PositiveLoginResponseType {
  username: string;
  userId: number;
  token: string;
}
