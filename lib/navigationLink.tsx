import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export const navLinks = [
  {
    route: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    route: "#",
    icon: ShoppingCart,
    label: "Orders",
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
    route: "#",
    icon: LineChart,
    label: "Analytics",
  },
];
