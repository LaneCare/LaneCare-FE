import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export default async function getAuth() {
  return await getServerSession(authOptions);
}
