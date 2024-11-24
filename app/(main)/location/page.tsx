"use client";

import { LocationDetails } from "@/components/LocationDetails";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin, MoreHorizontal, Copy } from "lucide-react";

import { useState } from "react";

export default function LocationPage() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col gap-3 p-4 lg:gap-3 lg:p-6">
      <PageTitle
        title="Location"
        subtitle="Detailed overview of the selected location"
      />

      <div className="border-t-2 border-dashed pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-4 space-y-4">
            {/* Location Status Component */}
            <Card x-chunk="dashboard-07-chunk-3">
              {/* <CardHeader>
                <CardTitle>Location Status</CardTitle>
              </CardHeader> */}
              <CardContent>
                <div className="grid gap-6 pt-5">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="w-full h-[50vh] lg:h-[85vh] bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer">
              <MapPin className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                Map Container (Click to set location)
              </span>
            </div>
            {/* Map with Card Title Component */}
            {/* <Card className="">
              <CardHeader>
                <CardTitle>Choose Location</CardTitle>
                <p className="text-xs text-gray-400">
                  Click to change location
                </p>
              </CardHeader>
              <CardContent className="px-1">
                <div className=" bg-gray-200 dark:bg-gray-800rounded-lg h-[650px] flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-400">
                      Map Container (Click to set location)
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-3 py-3">
                <div className="text-xs text-muted-foreground">
                  Map by : Open Street Map with React Leaflet
                </div>
              </CardFooter>
            </Card> */}
          </div>

          {/* Details Card */}
          {/* <div className="space-y-6 lg:col-span-1">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Location Status
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Location Images
                </CardTitle>
                <p className="text-xs text-gray-400">Click to view full size</p>
              </CardHeader>
              <CardContent>
                <Dialog
                  open={isImageModalOpen}
                  onOpenChange={setIsImageModalOpen}
                >
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <Image
                        src="/JalanRusakPlaceholder.jpeg"
                        alt="Location Image"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <Image
                      src="/JalanRusakPlaceholder.jpeg"
                      alt="Location Image"
                      width={800}
                      height={600}
                      className="rounded-lg object-cover w-full"
                    />
                  </DialogContent>
                </Dialog>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Image
                    src="/JalanRusakPlaceholder.jpeg"
                    alt="Thumbnail 1"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-full"
                  />
                  <Image
                    src="/JalanRusakPlaceholder.jpeg"
                    alt="Thumbnail 2"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-full"
                  />
                  <Button variant="outline" size="icon" className="rounded-lg">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Name</h3>
                  <p className="text-sm">Sample Location Name</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Coordinates
                  </h3>
                  <p className="text-sm">40.7128° N, 74.0060° W</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Category
                  </h3>
                  <p className="text-sm">Urban Area</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Last Updated
                  </h3>
                  <p className="text-sm">November 23, 2023</p>
                </div>
              </CardContent>
            </Card>
          </div> */}
          <div className="lg:col-span-2">
            {/* <LocationDetails locationDetailData={[]} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
