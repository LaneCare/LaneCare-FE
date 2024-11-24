import { ReportUserLogJoinType, UserReportJoinType } from "@/lib/types/types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
}) as React.ComponentType<{
  data: ReportUserLogJoinType[];
  activeReport?: ReportUserLogJoinType | null;
  setActiveReport?: React.Dispatch<
    React.SetStateAction<ReportUserLogJoinType | null>
  >;
}>;

export default Map;
