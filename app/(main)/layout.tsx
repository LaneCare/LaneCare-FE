import { Sidebar } from "@/components/navbar/Sidebar";
import { Topbar } from "@/components/navbar/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
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
