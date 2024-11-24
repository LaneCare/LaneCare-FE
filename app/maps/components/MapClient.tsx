"use client";
import { FC, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Map from "@/components/map";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LocationDetails } from "@/components/LocationDetails";
import { ReportUserLogJoinType, UserReportJoinType } from "@/lib/types/types";

interface MapClientProps {
  data: ReportUserLogJoinType[];
}

const MapClient: FC<MapClientProps> = ({ data }) => {
  const [activeReport, setActiveReport] =
    useState<ReportUserLogJoinType | null>(data[0]);

  return (
    <div className="border-t-2 border-dashed pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-4 space-y-4">
          {/* Location Status Component */}
          {/* <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 ">
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* <div className="w-full h-[50vh] lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer">
          <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            Map Container (Click to set location)
          </span>
        </div> */}

          <div className="w-full lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl z-0">
            <Map
              data={data}
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
