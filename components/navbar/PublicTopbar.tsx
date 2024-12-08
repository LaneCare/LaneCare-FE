"use client";

import React, { useState, useEffect } from "react";
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
import { Menu, X, Moon, Sun, User } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import AvatarWithName from "./AvatarWithName";
import CustomDropdownMenu from "./DropdownMenuComponent";
import { useSession } from "next-auth/react";
import { date } from "zod";
import { useRouter } from "next/navigation";
import { UserSession } from "@/lib/types/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("UserData");
    console.log(userData);
    console.log("isLoggedin");
    console.log(isLoggedIn);
  }, []);

  const NavItems = () => (
    <>
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
    </>
  );

  return (
    <header className="sticky top-0 z-[50] w-full border-b bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="sm:container max-sm:px-2 flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                {/* <Package2 className="h-6 w-6" /> */}
                <Image
                  src="/LaneCareWithText.svg"
                  alt="LaneCare Logo"
                  className="dark:invert"
                  width={120}
                  height={24}
                  priority
                />
                <span className="sr-only">LaneCare</span>
              </Link>
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
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
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NavItems />
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {isLoggedIn && userData != null ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
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
