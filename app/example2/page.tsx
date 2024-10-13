import { NewLocation } from "@/components/new-location";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/TopBar";

export default function LeafletExample() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <NewLocation />
        </main>
      </div>
    </div>
  );
}
