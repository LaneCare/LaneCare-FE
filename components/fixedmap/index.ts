import { ReportUserLogJoinType, UserReportJoinType } from "@/lib/types/types";
import dynamic from "next/dynamic";

const FixedMap = dynamic(() => import("./FixedMap"), {
  ssr: false,
}) as React.ComponentType<{
  center: [number, number]; // Map center coordinates
  markerPosition: [number, number]; // Marker position coordinates
}>;

export default FixedMap;
