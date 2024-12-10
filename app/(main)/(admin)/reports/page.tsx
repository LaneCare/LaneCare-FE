import PageTitle from "@/components/PageTitle";
import ReportTable from "@/components/datatable/report-table";
import { ReportService } from "@/lib/server/services/reportService";

export default async function ReportPage() {
  const reportService = new ReportService();
  const reportsWithUser = await reportService.getAllJoinedReportUser();

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle title="Reports" />
      <ReportTable data={reportsWithUser} />
    </div>
  );
}
