import { LocationDetails } from "@/components/LocationDetails";
import PublicTopbar from "@/components/navbar/PublicTopbar";
import UnauthenticatedTopbar from "@/components/navbar/UnauthenticatedTopbar";
import PageTitle from "@/components/PageTitle";
import { ReportService } from "@/lib/server/services/reportService";
import MapClient from "./components/MapClient";
// import { auth } from "@/auth";
import { UserSession } from "@/lib/types/auth";
import getAuth from "@/lib/getAuth";

export default async function LocationPage() {
  const reportService = new ReportService();
  const reportsWithUser = await reportService.getAllJoinedReportUser();
  const reportsWithUserLog = await reportService.getAllJoinedReportUserLog();

  const session = await getAuth();
  let userData: UserSession | undefined = undefined;

  if (session?.user) {
    userData = {
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
      id: session.user.id,
    };

    console.log(session.user);
  }

  const isLoggedIn = !!session?.user;

  return (
    <div className="w-full">
      <PublicTopbar
        isLoggedIn={isLoggedIn}
        userData={userData}
        userName={"RadityaDito"}
      />
      <div className="container max-sm:px-10 flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
        <PageTitle
          title="Location"
          subtitle="Detailed overview of the selected location"
        />

        <MapClient data={reportsWithUserLog} />
      </div>
    </div>
  );
}
