import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Menu, X } from "lucide-react";
import DashboardNav from "@/components/DashboardNav";

interface CurrentCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "product" | "service" | "both";
  isLoggedIn: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CurrentCustomer | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JB</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              Jerobyte CRM
            </h1>
          </div>

          {/* Desktop Header Actions */}
          <div className="hidden sm:flex items-center gap-6">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900">{customer.name}</p>
                <p className="text-gray-500">{customer.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
          <div className="sm:hidden border-t border-gray-200 p-4 space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-gray-500 text-xs">{customer.email}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="flex-1 text-red-600 hover:bg-red-50"
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
        <div className="hidden md:block w-64 bg-white border-r border-gray-200">
          <DashboardNav customerType={customer.type} />
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-b border-gray-200">
            <DashboardNav customerType={customer.type} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {customer.name.split(" ")[0]}!
            </h2>
            <p className="text-gray-600 mb-8">
              Manage your products, services, and orders from your dashboard.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Active Orders</div>
                <div className="text-3xl font-bold text-gray-900">2</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">
                  Service Bookings
                </div>
                <div className="text-3xl font-bold text-gray-900">1</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Pending Invoices</div>
                <div className="text-3xl font-bold text-gray-900">3</div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
