import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardNav from "./DashboardNav";
import { useNotifications } from "@/hooks/useNotifications";

interface CurrentCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: "product" | "service" | "both";
  isLoggedIn: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CurrentCustomer | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  useEffect(() => {
    const stored = localStorage.getItem("currentCustomer");
    if (!stored) {
      navigate("/");
      return;
    }

    const customerData = JSON.parse(stored);
    console.log("✅ Current Customer Data:", customerData); // 🔍 Debug log
    
    if (!customerData.isLoggedIn) {
      navigate("/");
      return;
    }

    setCustomer(customerData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentCustomer");
    navigate("/");
  };

  const goHome = () => {
    navigate("/dashboard");
    setMobileMenuOpen(false);
  };

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // ✅ Debug: Check customer type
  console.log(`✅ Customer Type: ${customer.type}`);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={goHome}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JB</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block text-white">
              Jerobyte CRM
            </h1>
          </div>

          {/* Desktop Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-white"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Notifications
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-2 hover:bg-gray-50 rounded text-sm cursor-pointer ${
                            notif.read ? "text-gray-500" : "font-semibold"
                          }`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <p className="text-gray-900">{notif.title}</p>
                          <p className="text-xs text-gray-500">
                            {notif.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-white/30">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {customer.name.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="font-medium text-white">{customer.name}</p>
                <p className="border border-gray-200 text-gray-100 px-2 py-1 rounded text-xs">
                  {customer.email}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-white"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r border-gray-200 max-h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px] bg-blue-100">
          {/* ✅ FIX: Pass customerType correctly */}
          <DashboardNav customerType={customer.type} />
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full border-b border-gray-200 max-h-96 overflow-y-auto bg-blue-100">
            {/* ✅ FIX: Pass customerType correctly */}
            <DashboardNav customerType={customer.type} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
