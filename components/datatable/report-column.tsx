import { ReportType } from "@/lib/types/Report";
import SortDropdown from "./SortDropdown";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { UserReportJoinType } from "@/lib/types/types";

export const reportColumns2: ColumnDef<UserReportJoinType>[] = [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => <div className="w-12">{row.index + 1}</div>,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <SortDropdown column={column} title="Username" />,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => <SortDropdown column={column} title="City" />,
  },
  {
    accessorKey: "street",
    header: ({ column }) => <SortDropdown column={column} title="Street" />,
    cell: ({ row }) => {
      const street = row.getValue("street") as string;
      return street || "Random Street";
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortDropdown column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as UserReportJoinType["status"];
      return (
        <Badge
          variant={
            status === "Verified"
              ? "default"
              : status === "On-Review"
              ? "secondary"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => <SortDropdown column={column} title="Timestamp" />,
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("timestamp"));
      return timestamp.toLocaleString();
    },
  },
];

export const reportColumns: ColumnDef<UserReportJoinType>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => <SortDropdown column={column} title="Report By" />,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "street",
    header: ({ column }) => <SortDropdown column={column} title="Street" />,
  },
  {
    accessorKey: "city",
    header: ({ column }) => <SortDropdown column={column} title="City" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortDropdown column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as UserReportJoinType["status"];
      return (
        <Badge
          variant={
            status === "Submitted"
              ? "default"
              : status === "On-Review"
              ? "secondary"
              : status === "Declined"
              ? "destructive"
              : status === "Verified"
              ? "success"
              : status === "On-Going"
              ? "info"
              : status === "Maintenance"
              ? "warning"
              : status === "Finished"
              ? "outline"
              : "default" // Fallback for any unrecognized status
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => <SortDropdown column={column} title="Date" />,
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("timestamp"));
      return timestamp.toLocaleString();
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortDropdown column={column} title="Amount" />,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("amount")}</div>
    ),
  },
];

function formatTimestampToDate(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
