import ReportTable from "@/components/datatable/report-table";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { ReportService } from "@/lib/server/services/reportService";

export default async function InventoryPage() {
  const products = ["Product 1", "Product 2", "Product 3"];

  const reportService = new ReportService();
  const reports = await reportService.getAllReports();
  const reportsWithUser = await reportService.getAllJoinedReportUser();

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6 min-h-[92vh]">
      <PageTitle title="Products" />
      <div
        className=" flex flex-1  rounded-lg border-2 border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {/* Check if Product Exist  */}
        {reportsWithUser.length > 0 ? (
          <div className="w-full p-5">
            <ReportTable data={reportsWithUser} />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div>
        )}
        {/* <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div> */}
      </div>
    </div>
  );
}
