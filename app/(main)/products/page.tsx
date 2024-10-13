import ReportTable from "@/components/report-table";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";

export default function InventoryPage() {
  const products = ["Product 1", "Product 2", "Product 3"];

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6 min-h-[92vh]">
      <PageTitle title="Products" />
      <div
        className="flex flex-1  rounded-lg border-2 border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {/* Check if Product Exist  */}
        {products.length > 0 ? (
          <div className="w-full p-5">
            <ReportTable />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
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
