"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { navLinks } from "@/lib/navigationLink";
import { usePathname, useRouter } from "next/navigation";
import { extractFirstPathSegment } from "@/lib/utils";
import NavLink from "./NavLink";
import { UserSession } from "@/lib/types/auth";

interface SidebarProps {
  userSession: UserSession;
}

export function Sidebar({ userSession }: SidebarProps) {
  const pathname = usePathname();
  const routeSection = "/" + extractFirstPathSegment(pathname);

  return (
    <div className="hidden border-r bg-muted/40 md:block  w-[220px] lg:w-[270px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <Package2 className="h-6 w-6" /> */}
            <Image
              src="/LaneCareWithText.svg"
              alt="LaneCare Logo"
              className="dark:invert"
              width={120}
              height={24}
              priority
            />
            {/* <span className="">LaneCare</span> */}
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <NavLink
            userSession={userSession}
            className="grid items-start px-2 text-sm font-medium lg:px-4"
          />
        </div>
        <div className="mt-auto px-4 py-6">
          <UserAvatar userSession={userSession} />
        </div>
      </div>
    </div>
  );
}
