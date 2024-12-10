"use client";

import { useMemo } from "react";
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
import { ReportUserLogJoinType, IotDeviceType } from "@/lib/types/types";
import {
  Activity,
  BarChart3,
  MapPin,
  Radio,
  Users,
  Smartphone,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Utility functions to process the data
const getStatusCounts = (data: ReportUserLogJoinType[]) => {
  const counts = data.reduce((acc, report) => {
    acc[report.status] = (acc[report.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([status, value]) => ({
    status,
    value,
    color: getStatusColor(status),
  }));
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Submitted: "#FF6384",
    "On-Review": "#36A2EB",
    Verified: "#FFCE56",
    Declined: "#4BC0C0",
    "On-Going Maintenance": "#9966FF",
    Finished: "#FF9F40",
  };
  return colors[status] || "#999999";
};

const getTimelineData = (data: ReportUserLogJoinType[]) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(new Date().getFullYear(), i, 1)
  );

  return months.map((month) => {
    const reports = sortedData.filter(
      (report) => new Date(report.timestamp).getMonth() === month.getMonth()
    ).length;
    const resolved = sortedData.filter(
      (report) =>
        new Date(report.timestamp).getMonth() === month.getMonth() &&
        (report.status === "Finished" || report.status === "Declined")
    ).length;

    return {
      month: month.toLocaleString("default", { month: "short" }),
      reports,
      resolved,
    };
  });
};

const getLocationData = (data: ReportUserLogJoinType[]) => {
  const cityCounts = data.reduce((acc, report) => {
    if (report.city) {
      acc[report.city] = (acc[report.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, reports], index) => ({
      city,
      reports,
      color: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][index],
    }));
};

const getCumulativeReportsByStatus = (data: ReportUserLogJoinType[]) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const statusCounts: Record<string, number[]> = {};
  const dates: string[] = [];

  sortedData.forEach((report, index) => {
    const date = new Date(report.timestamp).toISOString().split("T")[0];
    if (!dates.includes(date)) {
      dates.push(date);
    }
    if (!statusCounts[report.status]) {
      statusCounts[report.status] = new Array(dates.length).fill(0);
    }
    statusCounts[report.status][dates.indexOf(date)]++;
  });

  return dates.map((date, index) => {
    const entry: any = { date };
    Object.keys(statusCounts).forEach((status) => {
      entry[status] = statusCounts[status][index];
    });
    return entry;
  });
};

const getAverageResolutionTimeByCity = (data: ReportUserLogJoinType[]) => {
  const cityData: Record<string, { total: number; count: number }> = {};

  data.forEach((report) => {
    if (report.city && report.status === "Finished") {
      const resolutionTime =
        new Date(report.timestamp).getTime() -
        new Date(report.logs[0].changetime).getTime();
      if (!cityData[report.city]) {
        cityData[report.city] = { total: 0, count: 0 };
      }
      cityData[report.city].total += resolutionTime;
      cityData[report.city].count++;
    }
  });

  return Object.entries(cityData)
    .map(([city, { total, count }]) => ({
      city,
      averageTime: (total / count / (1000 * 60 * 60 * 24)).toFixed(2), // Convert to days and round to 2 decimal places
    }))
    .sort((a, b) => parseFloat(b.averageTime) - parseFloat(a.averageTime))
    .slice(0, 5);
};

const getReportFrequencyHeatmap = (data: ReportUserLogJoinType[]) => {
  const heatmapData: Record<string, number> = {};

  data.forEach((report) => {
    const date = new Date(report.timestamp);
    const day = date.getDay();
    const hour = date.getHours();
    const key = `${day}-${hour}`;
    heatmapData[key] = (heatmapData[key] || 0) + 1;
  });

  return Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({
      day,
      hour,
      value: heatmapData[`${day}-${hour}`] || 0,
    }))
  ).flat();
};

// Updated IoT device distribution function
const getIotDeviceDistribution = (iotDevices: IotDeviceType[]) => {
  const deviceCounts = iotDevices.reduce((acc, device) => {
    const [prefix] = device.devicename.split("-");
    acc[prefix] = (acc[prefix] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(deviceCounts)
    .map(([type, count], index) => ({
      type,
      count,
      color: `hsl(${index * 40}, 70%, 50%)`,
    }))
    .sort((a, b) => b.count - a.count); // Sort by count in descending order
};

const getReportToDeviceRatio = (
  reports: ReportUserLogJoinType[],
  iotDevices: IotDeviceType[]
) => {
  const cityData = reports.reduce((acc, report) => {
    if (report.city) {
      acc[report.city] = (acc[report.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const deviceData = iotDevices.reduce((acc, device) => {
    const [, city] = device.devicename.split("-");
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(cityData)
    .map((city) => ({
      city,
      reports: cityData[city] || 0,
      devices: deviceData[city] || 0,
      ratio: cityData[city] / (deviceData[city] || 1),
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 10);
};

interface AnalyticsDashboardProps {
  data: ReportUserLogJoinType[];
  iotDevices?: IotDeviceType[];
}

const dummyIoTDevices: IotDeviceType[] = [
  {
    deviceid: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    devicename: "Temperature-Sensor-1",
    description: "A sensor used to monitor room temperature",
    userid: "123e4567-e89b-12d3-a456-426614174000",
  },
  {
    deviceid: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4",
    devicename: "Smart-Light-1",
    description: "A Wi-Fi enabled light bulb",
    userid: "789e4567-e89b-12d3-a456-426614174111",
  },
  {
    deviceid: "m3n4o5p6-l1k2-j0i9-h8g7-f6e5d4c3b2a1",
    devicename: "Door-Lock-1",
    description: "Smart door lock",
    userid: "456e1237-e89b-12d3-a456-426614174222",
  },
];

export default function AnalyticsDashboard({
  data,
  iotDevices = dummyIoTDevices,
}: AnalyticsDashboardProps) {
  const statusData = useMemo(() => getStatusCounts(data), [data]);
  const timelineData = useMemo(() => getTimelineData(data), [data]);
  const locationData = useMemo(() => getLocationData(data), [data]);
  const cumulativeReportsData = useMemo(
    () => getCumulativeReportsByStatus(data),
    [data]
  );
  const resolutionTimeData = useMemo(
    () => getAverageResolutionTimeByCity(data),
    [data]
  );
  const heatmapData = useMemo(() => getReportFrequencyHeatmap(data), [data]);

  const totalReports = data.length;
  const activeUsers = new Set(data.map((report) => report.userid)).size;
  const activeLocations = new Set(
    data.map((report) => report.city).filter(Boolean)
  ).size;
  const latestStatus = data[0]?.status || "N/A";

  const iotDeviceDistribution = useMemo(
    () => getIotDeviceDistribution(iotDevices),
    [iotDevices]
  );
  const reportToDeviceRatio = useMemo(
    () => getReportToDeviceRatio(data, iotDevices),
    [data, iotDevices]
  );

  return (
    <div className="w-full space-y-4 overflow-x-auto">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto">
        {[
          {
            title: "Total Reports",
            value: totalReports,
            description: "Total reports submitted",
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Active Users",
            value: activeUsers,
            description: "Unique users with reports",
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "IoT Devices",
            value: iotDevices.length,
            description: "Active IoT devices",
            icon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Active Locations",
            value: activeLocations,
            description: "Cities with reports",
            icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
          },
        ].map(({ title, value, description, icon }, index) => (
          <Card className="w-full min-w-0" key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 overflow-x-auto w-full min-w-0">
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

      {/* <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-2 overflow-x-auto w-full min-w-0">
          <CardHeader>
            <CardTitle>Cumulative Reports by Status</CardTitle>
            <CardDescription>
              Stacked area chart showing report accumulation over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[400px] w-full"
              config={Object.keys(cumulativeReportsData[0] || {})
                .filter((key) => key !== "date")
                .reduce(
                  (acc, status) => ({
                    ...acc,
                    [status]: {
                      label: status,
                      color: getStatusColor(status),
                    },
                  }),
                  {}
                )}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cumulativeReportsData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {Object.keys(cumulativeReportsData[0] || {})
                    .filter((key) => key !== "date")
                    .map((status, index) => (
                      <Area
                        key={status}
                        type="monotone"
                        dataKey={status}
                        stackId="1"
                        stroke={getStatusColor(status)}
                        fill={getStatusColor(status)}
                      />
                    ))}
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div> */}

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1 overflow-x-auto w-full min-w-0">
          <CardHeader>
            <CardTitle>IoT Device Distribution</CardTitle>
            <CardDescription>
              Distribution of IoT devices by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px]"
              config={iotDeviceDistribution.reduce(
                (acc, { type, color }) => ({
                  ...acc,
                  [type]: { label: type, color },
                }),
                {}
              )}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={iotDeviceDistribution}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="type" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count">
                    {iotDeviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-x-auto w-full min-w-0">
          <CardHeader>
            <CardTitle>Report to Device Ratio</CardTitle>
            <CardDescription>
              Top 10 cities by number of reports per IoT device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[300px]"
              config={{
                ratio: {
                  label: "Reports per Device",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reportToDeviceRatio}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="city" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="ratio" fill="hsl(var(--chart-1))">
                    {reportToDeviceRatio.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`hsl(${index * 36}, 70%, 50%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
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
              className="h-[350px] lg:w-full "
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
                    height={75}
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
            <div className="space-y-2">
              {data.slice(0, 5).map((report) => (
                <div
                  key={report.reportid}
                  className="flex items-start space-x-4"
                >
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm space-y-1">
                    <p className="leading-tight font-medium">
                      Report ID:{" "}
                      <span className="font-semibold">{report.reportid}</span>
                    </p>
                    <p className="leading-tight">
                      Status:{" "}
                      <span className="font-semibold">{report.status}</span> |
                      Updated by:{" "}
                      <span className="font-semibold">{report.username}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.timestamp).toLocaleString()}
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
