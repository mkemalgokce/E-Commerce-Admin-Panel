import * as z from "zod";
import { BaseAttributes } from "./index";

const LoginCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginCredentials = z.infer<typeof LoginCredentials>;

const RegisterCredentials = LoginCredentials.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});
type RegisterCredentials = z.infer<typeof RegisterCredentials>;

type UserCreateAttributes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
};

type UserUpdateAttributes = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

type UserDocument = UserCreateAttributes & BaseAttributes;
export { UserDocument, LoginCredentials, RegisterCredentials };
