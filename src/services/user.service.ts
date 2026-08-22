import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      return {
        data: session,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error,
      };
    }
  },

  createAccount: async function (data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const url = new URL(`${env.AUTH_URL}/sign-up/email`);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.log("error", error);
      return error;
    }
  },
};
