import { LocationDetails } from "@/components/LocationDetails";
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
import Map from "@/components/map";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ReportService } from "@/lib/server/services/reportService";
import { MapPin, MoreHorizontal, Copy } from "lucide-react";
import MapClient from "./components/MapClient";

export default async function LocationPage() {
  const reportService = new ReportService();
  const reportsWithUser = await reportService.getAllJoinedReportUser();

  //TODO: Delete This Comment

  const reportsWithUserLog = await reportService.getAllJoinedReportUserLog();

  // Print each report in a readable format
  // reportsWithUserLog.forEach((report, index) => {
  //   if (report.reportid === "382b12ed-e840-49dd-86b6-539f0cabf58c") {
  //     console.log(`Report ${index + 1}`);
  //     console.log("=".repeat(50));
  //     console.log(`Report ID: ${report.reportid}`);
  //     console.log(`Description: ${report.description}`);
  //     console.log(`Status: ${report.status}`);
  //     console.log(`Timestamp: ${new Date(report.timestamp).toLocaleString()}`);
  //     console.log(`Location:`);
  //     console.log(`  Latitude: ${report.latitude}`);
  //     console.log(`  Longitude: ${report.longitude}`);
  //     console.log(
  //       `  Address: ${report.street}, ${report.city}, ${report.state}`
  //     );
  //     console.log(`User Details:`);
  //     console.log(`  User ID: ${report.userid}`);
  //     console.log(`  Name: ${report.username}`);
  //     console.log(`  Email: ${report.email}`);
  //     console.log(`  Role: ${report.role}`);
  //     console.log(`Logs:`);
  //     report.logs.forEach((log, logIndex) => {
  //       console.log(`  Log ${logIndex + 1}:`);
  //       console.log(`    Verification ID: ${log.verificationid}`);
  //       console.log(`    Status: ${log.status}`);
  //       console.log(`    Comments: ${log.comments}`);
  //       console.log(
  //         `    Change Time: ${new Date(log.changetime).toLocaleString()}`
  //       );
  //     });
  //     console.log("\n");
  //   }
  // });

  return (
    <div className="w-full ">
      <PublicTopbar isLoggedIn={false} userName={"RadityaDito"} />
      <div className="container flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
        <PageTitle
          title="Location"
          subtitle="Detailed overview of the selected location"
        />

        <MapClient data={reportsWithUserLog} />
      </div>
    </div>
  );
}
