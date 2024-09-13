import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export const navLinks = [
  {
    route: "",
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
    route: "#",
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
