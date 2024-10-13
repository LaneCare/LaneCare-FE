import Map from "@/components/map";
import { NewLocation } from "@/components/new-location";

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
