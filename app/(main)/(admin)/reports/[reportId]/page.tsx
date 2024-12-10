import FixedMap from "@/components/fixedmap";
import { LocationDetails } from "@/components/LocationDetails";
import PageTitle from "@/components/PageTitle";

import { ReportService } from "@/lib/server/services/reportService";
import UpdateStatusCard from "../components/UpdateStatusCard";

//Get Report By Id join with user and log
export default async function ReportDetailpage({
  params,
}: {
  params: { reportId: string };
}) {
  const { reportId } = params;

  // Instantiate the report service
  const reportService = new ReportService();

  // Fetch report details by ID
  const activeReport = await reportService.getJoinedReportUserLogById(reportId);

  // Handle case where no report is found
  if (!activeReport) {
    return (
      <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
        <PageTitle
          title="Update Report Status"
          subtitle="Detailed overview of the selected location"
        />
        <p className="text-center text-gray-500">Report not found.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle
        title="Update Report Status"
        subtitle="Detailed overview of the selected location"
      />

      <div className="border-t-2 border-dashed pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-4 space-y-4">
            {/* Location Status Component */}
            <UpdateStatusCard report={activeReport} />

            {/* <div className="w-full h-[50vh] lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer">
          <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            Map Container (Click to set location)
          </span>
        </div> */}

            <div className="w-full lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl z-0">
              <FixedMap
                center={[activeReport.latitude, activeReport.longitude]}
                markerPosition={[activeReport.latitude, activeReport.longitude]}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <LocationDetails locationDetailData={activeReport} />
          </div>
        </div>
      </div>
    </div>
  );
}
