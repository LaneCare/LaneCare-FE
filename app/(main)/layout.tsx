import { auth } from "@/auth";
import { Sidebar } from "@/components/navbar/Sidebar";
import { Topbar } from "@/components/navbar/TopBar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect or handle cases where session or user is undefined
  if (!session || !session.user) {
    // Replace with your app's redirection logic
    redirect("/login");
  }

  return (
    <div className="flex h-screen ">
      <Sidebar userSession={session.user} />
      <div className="flex flex-col flex-1">
        <Topbar userSession={session.user} />
        <main
          className="flex-1 custom-scrollbar "
          role="main"
          aria-label="Dashboard Content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
