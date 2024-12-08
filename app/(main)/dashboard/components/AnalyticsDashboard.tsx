"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Activity, BarChart3, MapPin, Radio, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Sample data - Replace with actual data from your backend
const statusData = [
  { status: "Submitted", value: 45, color: "#FF6384" },
  { status: "On-Review", value: 20, color: "#36A2EB" },
  { status: "Verified", value: 30, color: "#FFCE56" },
  { status: "Declined", value: 15, color: "#4BC0C0" },
  { status: "On-Going Maintenance", value: 25, color: "#9966FF" },
  { status: "Finished", value: 35, color: "#FF9F40" },
];

const timelineData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2023, i).toLocaleString("default", { month: "short" }),
  reports: Math.floor(Math.random() * 100),
  resolved: Math.floor(Math.random() * 80),
}));

const locationData = [
  { city: "New York", reports: 120, color: "#FF6384" },
  { city: "Los Angeles", reports: 80, color: "#36A2EB" },
  { city: "Chicago", reports: 60, color: "#FFCE56" },
  { city: "Houston", reports: 45, color: "#4BC0C0" },
  { city: "Phoenix", reports: 35, color: "#9966FF" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="w-full space-y-4 overflow-hidden">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IoT Devices</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">438</div>
            <p className="text-xs text-muted-foreground">+24 new devices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Locations
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">+3 new locations</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-x-auto">
          <CardHeader>
            <CardTitle>Reports Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reports: {
                  label: "Reports",
                  color: "#FF6384",
                },
                resolved: {
                  label: "Resolved",
                  color: "#36A2EB",
                },
              }}
              className="h-[300px] lg:w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="month"
                    fontSize={12}
                    tickMargin={8}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={12} width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#FF6384"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#36A2EB"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current report status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Reports",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] lg:w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    labelLine={true}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-x-auto">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Reports by city</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                reports: {
                  label: "Reports",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] lg:w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="city"
                    fontSize={12}
                    tickMargin={8}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={12} width={40} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="reports" radius={[4, 4, 0, 0]}>
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest report updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Activity className="mr-4 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Status changed to{" "}
                      {["Verified", "On-Review", "Finished"][i % 3]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        Date.now() - i * 2 * 60 * 60 * 1000
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
