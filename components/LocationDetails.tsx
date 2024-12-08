"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  MoreVertical,
  MapPin,
  ZoomIn,
  ImageIcon,
  Clock,
} from "lucide-react";
import { ReportUserLogJoinType } from "@/lib/types/types";

interface LocationDetailsProps {
  locationDetailData: ReportUserLogJoinType | null;
}

//TODO: Fix Date Issue, Fix PopUp

export function LocationDetails({ locationDetailData }: LocationDetailsProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const toggleImage = () => setShowImage(!showImage);

  if (!locationDetailData) {
    return <div>No location data available.</div>;
  }

  // Format the coordinates for display
  const formatCoordinates = (lat: number, lon: number) => {
    return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(
      lon
    ).toFixed(4)}°${lon >= 0 ? "E" : "W"}`;
  };

  // Generate a human-readable title
  const getLocationTitle = () => {
    if (locationDetailData.street && locationDetailData.city) {
      const street = locationDetailData.street.substring(0, 100);
      return `${street}, ${locationDetailData.city}`;
    } else if (locationDetailData.city) {
      return locationDetailData.city;
    } else {
      return formatCoordinates(
        locationDetailData.latitude,
        locationDetailData.longitude
      );
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "success";
      case "on-review":
        return "warning";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-col space-y-1.5 bg-muted/50">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold line-clamp-3">
              {getLocationTitle()}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              {/* <Clock className="h-3.5 w-3.5" /> */}
              <span className="font-medium">
                Added: {new Date(locationDetailData.timestamp).toLocaleString()}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1"
              onClick={toggleImage}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                {showImage ? "Hide Image" : "Show Image"}
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy ID</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {locationDetailData.reportid.slice(0, 8)}...
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="grid gap-4">
          {showImage && locationDetailData.imageurl && (
            <div
              className="relative overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: showImage ? "1000px" : "0" }}
            >
              <Dialog
                open={isImageModalOpen}
                onOpenChange={setIsImageModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group z-10">
                    <Image
                      src={locationDetailData.imageurl}
                      alt="Location Image"
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full mx-auto"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <ZoomIn className="text-white h-8 w-8" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-4">
                  <Image
                    src={locationDetailData.imageurl}
                    alt="Location Image"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full"
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="grid gap-2">
            <div className="font-semibold">Description</div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                {locationDetailData.description}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="font-semibold">Location Details</div>
            <ul className="grid gap-2">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={getStatusBadgeVariant(locationDetailData.status)}
                >
                  {locationDetailData.status}
                </Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Coordinates</span>
                <span className="font-medium">
                  {formatCoordinates(
                    locationDetailData.latitude,
                    locationDetailData.longitude
                  )}
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <div className="font-semibold">Address Information</div>
            <dl className="grid gap-2">
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Street</dt>
                <dd className="font-medium max-w-xs break-words text-right">
                  {locationDetailData.street || "N/A"}
                </dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">City</dt>
                <dd className="font-medium max-w-xs break-words text-right">
                  {locationDetailData.city || "N/A"}
                </dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">State</dt>
                <dd className="font-medium max-w-xs break-words text-right">
                  {locationDetailData.state || "N/A"}
                </dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Country</dt>
                <dd className="font-medium max-w-xs break-words text-right">
                  {locationDetailData.country || "N/A"}
                </dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Postcode</dt>
                <dd className="font-medium max-w-xs break-words text-right">
                  {locationDetailData.postcode || "N/A"}
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <div className="font-semibold">User Information</div>
            <dl className="grid gap-2">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Reported By</dt>
                <dd className="font-medium">{locationDetailData.username}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">User Role</dt>
                <dd className="font-medium">{locationDetailData.role}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">
                  <a href={`mailto:${locationDetailData.email}`}>
                    {locationDetailData.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <div className="font-semibold">Logs</div>
            {locationDetailData.logs.map((log, index) => (
              <div key={log.verificationid} className="bg-muted p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <span className="font-medium max-lg:hidden">Status : </span>
                    <Badge variant={getStatusBadgeVariant(log.status)}>
                      {log.status}
                    </Badge>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {new Date(log.changetime).toLocaleString()}
                  </span>
                </div>
                {log.comments && (
                  <p className="text-sm mt-1 text-muted-foreground">
                    {log.comments}
                  </p>
                )}
                {index < locationDetailData.logs.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Last updated:{" "}
          <time dateTime={locationDetailData.timestamp}>
            {new Date(locationDetailData.timestamp).toLocaleString()}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
