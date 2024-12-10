"use client";
import { cn, extractFirstPathSegment } from "@/lib/utils";
import { FC } from "react";
import { navLinks } from "@/lib/navigationLink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface NavLinkProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavLink: FC<NavLinkProps> = ({ className }) => {
  const pathname = usePathname();
  const routeSection = "/" + extractFirstPathSegment(pathname);

  return (
    <nav className={cn("", className)}>
      {navLinks.map((link) => {
        const isActive = link.route == routeSection;

        return (
          <Link
            href={link.route}
            key={link.label + link.route}
            className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all  ${
              isActive
                ? "bg-muted text-primary"
                : "hover:text-primary text-muted-foreground"
            }`}
          >
            <link.icon className="h-4 w-4" />

            {link.label}
            {/* {link.badge && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {link.badge}
              </Badge>
            )} */}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLink;
