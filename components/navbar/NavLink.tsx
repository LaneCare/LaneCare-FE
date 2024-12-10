"use client";
import { cn, extractFirstPathSegment } from "@/lib/utils";
import { FC } from "react";
import { navLinks } from "@/lib/navigationLink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserSession } from "@/lib/types/auth";
import { enumUserRole } from "@/lib/types/types";

interface NavLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  userSession: UserSession;
}

const NavLink: FC<NavLinkProps> = ({ className, userSession }) => {
  const pathname = usePathname();
  const routeSection = "/" + extractFirstPathSegment(pathname);

  // Define admin-only routes
  const adminOnlyRoutes = ["/dashboard", "/reports"];

  return (
    <nav className={cn("", className)}>
      {navLinks
        .filter((link) => {
          // Filter out admin routes if the role is 'user'
          if (
            userSession.role === "user" &&
            adminOnlyRoutes.includes(link.route)
          ) {
            return false;
          }
          return true;
        })
        .map((link) => {
          const isActive = link.route === routeSection;

          return (
            <Link
              href={link.route}
              key={link.label + link.route}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive
                  ? "bg-muted text-primary"
                  : "hover:text-primary text-muted-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
};

export default NavLink;
