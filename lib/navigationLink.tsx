import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  MapIcon,
  BarChart3,
  PlusCircle,
  PersonStanding,
} from "lucide-react";

export const navLinks = [
  {
    route: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    route: "/reports",
    icon: BarChart3,
    label: "Reports",
  },
  {
    route: "/form",
    icon: PlusCircle,
    label: "Add Report",
  },
  {
    route: "/register",
    icon: PersonStanding,
    label: "Add User",
  },

  // {
  //   route: "/products",
  //   icon: Package,
  //   label: "Products",
  //   isActive: true,
  // },
  // {
  //   route: "/location",
  //   icon: Users,
  //   label: "Customers",
  // },
  // {
  //   route: "/form",
  //   icon: LineChart,
  //   label: "Analytics",
  // },
];
