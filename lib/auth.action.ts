"use server";

import { signIn } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

//TODO: Still bad practice to use any
export const signInByCredentials = async (credentials: any) => {
  signIn("credentials", credentials);
};
