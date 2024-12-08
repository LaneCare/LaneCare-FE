"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SortDropdown from "./SortDropdown";
import { UserReportJoinType } from "@/lib/types/types";
import { reportColumns, reportColumns2 } from "./report-column";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  location: string;
  type: string;
  status: "Fulfilled" | "Pending" | "Declined";
  date: string;
  amount: string;
};

const ordersData: Order[] = [
  {
    id: "001",
    location: "New York",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    id: "002",
    location: "Los Angeles",
    type: "Refund",
    status: "Declined",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    id: "003",
    location: "Chicago",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    id: "004",
    location: "Houston",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-26",
    amount: "$450.00",
  },
  {
    id: "005",
    location: "Phoenix",
    type: "Sale",
    status: "Pending",
    date: "2023-06-27",
    amount: "$200.00",
  },
  {
    id: "006",
    location: "Philadelphia",
    type: "Refund",
    status: "Declined",
    date: "2023-06-28",
    amount: "$100.00",
  },
  {
    id: "007",
    location: "San Antonio",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-29",
    amount: "$300.00",
  },
  {
    id: "008",
    location: "San Diego",
    type: "Sale",
    status: "Pending",
    date: "2023-06-30",
    amount: "$400.00",
  },
  {
    id: "009",
    location: "Dallas",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-07-01",
    amount: "$500.00",
  },
  {
    id: "010",
    location: "San Jose",
    type: "Refund",
    status: "Declined",
    date: "2023-07-02",
    amount: "$50.00",
  },
  {
    id: "005",
    location: "Phoenix",
    type: "Sale",
    status: "Pending",
    date: "2023-06-27",
    amount: "$200.00",
  },
  {
    id: "006",
    location: "Philadelphia",
    type: "Refund",
    status: "Declined",
    date: "2023-06-28",
    amount: "$100.00",
  },
  {
    id: "007",
    location: "San Antonio",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-29",
    amount: "$300.00",
  },
  {
    id: "008",
    location: "San Diego",
    type: "Sale",
    status: "Pending",
    date: "2023-06-30",
    amount: "$400.00",
  },
  {
    id: "009",
    location: "Dallas",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-07-01",
    amount: "$500.00",
  },
  {
    id: "010",
    location: "San Jose",
    type: "Refund",
    status: "Declined",
    date: "2023-07-02",
    amount: "$50.00",
  },
];

export default function ReportTable({ data }: { data: UserReportJoinType[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <SortDropdown column={column} title="Order ID" />,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => <SortDropdown column={column} title="Location" />,
    },
    {
      accessorKey: "type",
      header: ({ column }) => <SortDropdown column={column} title="Type" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <SortDropdown column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status") as Order["status"];
        return (
          <Badge
            variant={
              status === "Fulfilled"
                ? "default"
                : status === "Pending"
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
      accessorKey: "date",
      header: ({ column }) => <SortDropdown column={column} title="Date" />,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <SortDropdown column={column} title="Amount" />,
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("amount")}</div>
      ),
    },
  ];

  const table = useReactTable({
    data: data,
    columns: reportColumns2,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="max-sm:max-w-[45vh] max-sm:mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="On-Review">On-Review</SelectItem>
              <SelectItem value="Declined">Declined</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="On-Going">On-Going</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Finished">Finished</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => router.push("/form")}
          size={"sm"}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Report
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    router.push(`/reports/${row.original.reportid}`)
                  }
                  className="cursor-pointer hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 mt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
