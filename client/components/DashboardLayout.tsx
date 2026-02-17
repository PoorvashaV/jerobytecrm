import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, LogOut, Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardNav from "./DashboardNav";

interface CurrentCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
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

  const [notifications] = useState([
    { id: 1, message: "New product arrived", time: "2 hours ago" },
    { id: 2, message: "Service booking confirmed", time: "1 day ago" },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem("currentCustomer");
    if (!stored) {
      navigate("/");
      return;
    }

    const customerData = JSON.parse(stored);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b sticky top-0 z-40" style={{ backgroundColor: 'rgba(74, 144, 226, 1)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JB</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block" style={{ color: 'white' }}>
              Jerobyte CRM
            </h1>
          </div>

          {/* Desktop Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'white' }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                          className="p-2 hover:bg-gray-50 rounded text-sm"
                        >
                          <p className="text-gray-900">{notif.message}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.3)' }}>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {customer.name.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="font-medium" style={{ color: 'white' }}>{customer.name}</p>
                <p style={{ borderWidth: '1px', borderColor: 'rgba(236, 241, 246, 1)', color: 'rgba(241, 243, 246, 1)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>{customer.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              style={{ color: 'white' }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg"
            style={{ color: 'white' }}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t bg-gray-50" style={{ borderColor: 'rgba(236, 241, 246, 1)' }}>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {customer.name.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-gray-500 text-xs">{customer.email}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r border-gray-200 max-h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px]" style={{ backgroundColor: 'rgba(209, 225, 246, 1)' }}>
          <DashboardNav customerType={customer.type} />
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full border-b border-gray-200 max-h-96 overflow-y-auto" style={{ backgroundColor: 'rgba(209, 225, 246, 1)' }}>
            <DashboardNav customerType={customer.type} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
