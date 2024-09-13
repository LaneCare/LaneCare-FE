import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden ">
        <Topbar />
        <main
          className="flex-1 overflow-y-auto custom-scrollbar "
          role="main"
          aria-label="Dashboard Content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
