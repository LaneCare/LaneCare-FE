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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical, MapPin, CreditCard, ZoomIn } from "lucide-react";

export function LocationDetails() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg font-bold">
            Location ABC123
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Location ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Added: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              View on Map
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm">
        <div className="grid gap-4">
          <div className="relative">
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
              <DialogTrigger asChild>
                <div className="relative cursor-pointer group">
                  <Image
                    src="/JalanRusakPlaceholder.jpeg"
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
                  src="/JalanRusakPlaceholder.jpeg"
                  alt="Location Image"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-2">
            <div className="font-semibold">Location Details</div>
            <ul className="grid gap-2">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">Central Park</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">Park</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-2">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Latitude</span>
                <span className="font-medium">40.7829° N</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Longitude</span>
                <span className="font-medium">73.9654° W</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Area</span>
                <span className="font-medium">843 acres Lorem</span>
              </li>
            </ul>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <div className="font-semibold">Additional Information</div>
            <dl className="grid gap-2">
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Established</dt>
                <dd className="font-medium max-w-xs break-words">1857</dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Annual Visitors</dt>
                <dd className="font-medium max-w-xs break-words">
                  ~42 million
                </dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-muted-foreground">Features</dt>
                <dd className="font-medium max-w-xs break-words">
                  Lakes, Meadows, Forests, and many other attractions that span
                  across the vast area of the park, providing a diverse range of
                  activities and scenic views for visitors.
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-2" />
          <div className="grid gap-2">
            <div className="font-semibold">Management Information</div>
            <dl className="grid gap-2">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Managed By</dt>
                <dd className="font-medium">Central Park Conservancy</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Contact</dt>
                <dd className="font-medium">
                  <a href="mailto:info@centralparknyc.org">
                    info@centralparknyc.org
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Website</dt>
                <dd className="font-medium">
                  <a
                    href="https://www.centralparknyc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.centralparknyc.org
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Last updated: <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
}
