import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Wrench, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  customerType: "product" | "service" | "both";
}

export default function DashboardNav({ customerType }: DashboardNavProps) {
  const location = useLocation();

  // ✅ FIX: Define navigation items with proper conditions
  const navItems = [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      show: true, // Always show profile
    },
    {
      label: "Product Catalog",
      href: "/products",
      icon: ShoppingCart,
      // ✅ FIX: Show if customer_type is "product" or "both"
      show: customerType === "product" || customerType === "both",
    },
    {
      label: "Service Booking",
      href: "/services",
      icon: Wrench,
      // ✅ FIX: Show if customer_type is "service" or "both"
      show: customerType === "service" || customerType === "both",
    },
    {
      label: "Invoice & Reports",
      href: "/invoices",
      icon: FileText,
      show: true, // Always show invoices
    },
  ];

  return (
    <nav className="p-4 md:p-6 space-y-2">
      {navItems.map((item) => {
        // ✅ Only render items that should be shown
        if (!item.show) return null;

        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
