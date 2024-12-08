"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Moon, Sun, User } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import AvatarWithName from "./AvatarWithName";
import CustomDropdownMenu from "./DropdownMenuComponent";
import { useSession } from "next-auth/react";
import { date } from "zod";
import { useRouter } from "next/navigation";
import { UserSession } from "@/lib/types/auth";

interface TopbarProps {
  isLoggedIn: boolean;
  userData?: UserSession;
  userName?: string;
}

export default function PublicTopbar({
  isLoggedIn,
  userName,
  userData,
}: TopbarProps) {
  const router = useRouter();

  useEffect(() => {
    console.log("UserData");
    console.log(userData);
    console.log("isLoggedin");
    console.log(isLoggedIn);
  }, []);

  return (
    <header className="sticky top-0 z-[50] w-full border-b bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container flex h-14 items-center ">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/LaneCareWithText.svg"
              alt="LaneCare Logo"
              className="dark:invert"
              width={120}
              height={32}
              priority
            />
          </Link>
        </div>
        <nav className={"flex items-center space-x-4 lg:space-x-6"}>
          <Link
            href="/maps"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Maps
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Settings
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[300px] lg:w-[300px]"
            />
          </div> */}

          {isLoggedIn && userData != null ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full "
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <CustomDropdownMenu userData={userData} />
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push("/login")} size="sm">
              Login
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
