import { LocationDetails } from "@/app/(main)/location/components/LocationDetails";
import PublicTopbar from "@/components/navbar/PublicTopbar";
import UnauthenticatedTopbar from "@/components/navbar/UnauthenticatedTopbar";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getReport } from "@/lib/server/services/report.service";
import { MapPin, MoreHorizontal, Copy } from "lucide-react";

export default async function LocationPage() {
  //   const result = await getReport();

  //   console.log(result);

  return (
    <div className="w-full ">
      <PublicTopbar isLoggedIn={true} userName={"RadityaDito"} />
      <div className="container flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
        <PageTitle
          title="Location"
          subtitle="Detailed overview of the selected location"
        />

        <div className="border-t-2 border-dashed pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Map Container */}
            <div className="lg:col-span-4 space-y-4">
              {/* Location Status Component */}
              <Card x-chunk="dashboard-07-chunk-3">
                {/* <CardHeader>
                <CardTitle>Location Status</CardTitle>
              </CardHeader> */}
                <CardContent>
                  <div className="grid gap-6 pt-5">
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
              </Card>

              <div className="w-full h-[50vh] lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer">
                <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  Map Container (Click to set location)
                </span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <LocationDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
