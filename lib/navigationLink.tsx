import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export const navLinks = [
  {
    route: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    route: "/reports",
    icon: ShoppingCart,
    label: "Reports",
    badge: 6,
  },
  {
    route: "/products",
    icon: Package,
    label: "Products",
    isActive: true,
  },
  {
    route: "#",
    icon: Users,
    label: "Customers",
  },
  {
    route: "/form",
    icon: LineChart,
    label: "Analytics",
  },
];
