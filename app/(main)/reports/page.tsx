import PageTitle from "@/components/PageTitle";
import ReportTable from "@/components/report-table";

export default function ReportPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle title="Reports" />
      <ReportTable />
    </div>
  );
}
