import Map from "@/components/map";
import MapForm from "@/components/mapform/MapForm";
import { ReportService } from "@/lib/server/services/reportService";

export default async function LeafletExample() {
  const reportService = new ReportService();
  const reportsWithUser = await reportService.getAllJoinedReportUser();
  const reportsWithUserLog = await reportService.getAllJoinedReportUserLog();

  return (
    <div className="w-full h-screen ">
      <div className="p-3">
        <Map data={reportsWithUserLog} />
        <br />
        {/* <MapForm /> */}
      </div>
    </div>
  );
}
