import getAuth from "@/lib/getAuth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await getAuth();

  //   if (!session || !session.user) {
  //     redirect("/login");
  //   }

  //   if (session.user.role == "user") {
  //     redirect("/unauthorized");
  //   }

  return <>{children}</>;
}
