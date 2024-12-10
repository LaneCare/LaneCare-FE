"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  button?: {
    title: string;
    route: string;
  };
}

const PageTitle = ({ title, subtitle, button }: PageTitleProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const pathSegments = pathName.split("/").filter((segment) => segment);

  return (
    <div className="flex flex-col pb-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {button && (
          <Link
            href={`${button.route}?callbackUrl=${button.route}`}
            className={cn(buttonVariants({ variant: "default" }), "")}
          >
            {button.title}
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
