import PageTitle from "@/components/PageTitle";
import AddNewReportForm from "./components/AddNewReportForm";
import getAuth from "@/lib/getAuth";

export default async function FormPage() {
  const session = (await getAuth())!;

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle
        title="Add New Report"
        subtitle=" Click on the map to set the location, then fill out the form below."
      />

      <AddNewReportForm userSession={session.user} />
    </div>
  );
}
