import Map from "@/components/map";
import { NewLocation } from "@/app/(main)/form/components/AddNewReportForm";

export default function LeafletExample() {
  return (
    <div className="w-full h-screen ">
      <div className="p-3">
        <Map />
      </div>
      {/* <NewLocation /> */}
    </div>
  );
}
