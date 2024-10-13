import { NewLocation } from "@/components/new-location";
import PageTitle from "@/components/PageTitle";

export default function FormPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle
        title="Add New Report"
        subtitle=" Click on the map to set the location, then fill out the form below."
      />

      <NewLocation />
    </div>
  );
}
