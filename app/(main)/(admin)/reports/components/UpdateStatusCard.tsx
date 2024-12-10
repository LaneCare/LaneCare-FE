"use client";
import { FC, useState } from "react";
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
import { enumReportStatus, ReportUserLogJoinType } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { ReportCommandService } from "@/lib/server/services/report.command.service";
import { useToast } from "@/components/hooks/use-toast";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { set } from "react-hook-form";

interface UpdateStatusCardProps {
  report: ReportUserLogJoinType;
}

const UpdateStatusCard: FC<UpdateStatusCardProps> = ({ report }) => {
  const [currentStatus, setCurrentStatus] = useState(report.status);
  const reportCommandService = new ReportCommandService();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const allReportStatuses = Object.values(enumReportStatus); // Get all values from the enum

  const handleUpdateStatus = async (status: string) => {
    setIsLoading(true);
    try {
      await reportCommandService.updateReportStatus(
        "98ca4a59-bbd5-4aad-876f-22d9569dfe62",
        report.reportid,
        status
      );
      toast({
        title: "Report Status Updated to " + status,
        description: "The report status has been successfully updated",
      });
    } catch (error) {
      console.error("Failed to update report status:", error);
      toast({
        title: "Failed to update report status",
        description: "An error occurred while updating the report status",
        variant: "destructive",
      });
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <Card x-chunk="dashboard-07-chunk-3">
      {/* <CardHeader>
    <CardTitle>Update Status</CardTitle>
  </CardHeader> */}
      <CardContent>
        <div className="grid gap-6 pt-6">
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={currentStatus}
              value={currentStatus}
              onValueChange={(value) => setCurrentStatus(value)}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {allReportStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => handleUpdateStatus(currentStatus)}
            >
              Update Status
            </ButtonWithLoading>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateStatusCard;
