"use server";
import { userService } from "@/services/user.service";

export const createAccount = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await userService.createAccount(data);
};
