import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Wrench, FileText, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  customerType: "product" | "service" | "both";
}

export default function DashboardNav({ customerType }: DashboardNavProps) {
  const location = useLocation();

  const navItems = [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      show: true,
    },
    {
      label: "Product Catalog",
      href: "/products",
      icon: ShoppingCart,
      show: customerType === "product" || customerType === "both",
    },
    {
      label: "Service Booking",
      href: "/services",
      icon: Wrench,
      show: customerType === "service" || customerType === "both",
    },
    {
      label: "Invoice & Reports",
      href: "/invoices",
      icon: FileText,
      show: true,
    },
  ];

  return (
    <nav className="p-4 md:p-6 space-y-2">
      {navItems.map((item) => {
        if (!item.show) return null;

        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
