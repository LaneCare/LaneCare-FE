import { ReportUserLogJoinType, UserReportJoinType } from "@/lib/types/types";
import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";

const MapForm = dynamic(() => import("./MapForm"), {
  ssr: false,
}) as React.ComponentType<{
  defaultMarkerPosition?: [number, number];
  form: UseFormReturn<
    {
      name: string;
      description: string;
      image: File;
      latitude: number;
      longitude: number;
    },
    any,
    undefined
  >;
}>;

export default MapForm;
