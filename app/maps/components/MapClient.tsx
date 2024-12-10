"use client";
import { FC, useState, useMemo } from "react";
import Map from "@/components/map";
import { LocationDetails } from "@/components/LocationDetails";
import { ReportUserLogJoinType } from "@/lib/types/types";
import { MultiSelect } from "@/components/ui/multi-select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserSession } from "@/lib/types/auth";

type StatusType = ReportUserLogJoinType["status"];

interface MapClientProps {
  data: ReportUserLogJoinType[];
  userData: UserSession | undefined;
}

const MapClient: FC<MapClientProps> = ({ data, userData }) => {
  const [activeReport, setActiveReport] =
    useState<ReportUserLogJoinType | null>(data[0] || null);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);
  const [showOnlyUserReports, setShowOnlyUserReports] = useState(false);

  const statusOptions = useMemo(
    () => [
      { label: "Submitted", value: "Submitted" },
      { label: "On-Review", value: "On-Review" },
      { label: "Declined", value: "Declined" },
      { label: "Verified", value: "Verified" },
      { label: "On-Going", value: "On-Going" },
      { label: "Maintenance", value: "Maintenance" },
      { label: "Finished", value: "Finished" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let filtered = data;

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((report) =>
        selectedStatuses.includes(report.status)
      );
    }

    if (showOnlyUserReports && userData) {
      filtered = filtered.filter((report) => report.userid === userData.id);
    }

    return filtered;
  }, [data, selectedStatuses, showOnlyUserReports, userData]);

  const handleStatusChange = (newStatuses: string[]) => {
    setSelectedStatuses(newStatuses as StatusType[]);
  };

  return (
    <div className="border-t-2 border-dashed pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Filters */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <Label htmlFor="status-filter" className="mb-2 block">
              Filter by Status
            </Label>
            <MultiSelect
              id="status-filter"
              options={statusOptions}
              onValueChange={handleStatusChange}
              placeholder="Select statuses"
              className="w-full"
            />
          </div>

          {userData && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="user-reports"
                checked={showOnlyUserReports}
                onCheckedChange={(checked) =>
                  setShowOnlyUserReports(checked as boolean)
                }
              />
              <Label htmlFor="user-reports">Show only my reports</Label>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="lg:col-span-4 space-y-4">
          <div className="w-full lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl z-0">
            <Map
              data={filteredData}
              activeReport={activeReport}
              setActiveReport={setActiveReport}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <LocationDetails locationDetailData={activeReport} />
        </div>
      </div>
    </div>
  );
};

export default MapClient;
