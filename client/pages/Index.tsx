import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "product" | "service" | "both";
  registeredAt: string;
}

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      type: "both",
      registeredAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543211",
      type: "product",
      registeredAt: "2024-02-20",
    },
  ]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
      return;
    }

    const existingCustomer = customers.find((c) => c.email === loginEmail);

    if (!existingCustomer) {
      setLoginError("Customer not found. Please register first.");
      return;
    }

    // Store customer info in localStorage for demo purposes
    localStorage.setItem(
      "currentCustomer",
      JSON.stringify({
        ...existingCustomer,
        isLoggedIn: true,
      })
    );

    navigate("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    if (!registerName || !registerEmail || !registerPhone) {
      setRegisterError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setRegisterError("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    if (registerPhone.length < 10) {
      setRegisterError("Please enter a valid phone number");
      return;
    }

    // Create new customer
    const newCustomer: Customer = {
      id: String(customers.length + 1),
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      type: "both",
      registeredAt: new Date().toISOString().split("T")[0],
    };

    // Store in localStorage
    localStorage.setItem(
      "currentCustomer",
      JSON.stringify({
        ...newCustomer,
        isLoggedIn: true,
      })
    );

    setRegisterSuccess("Registration successful! Redirecting to dashboard...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Logo and Header */}
      <div className="pt-8 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">JB</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Jerobyte Software
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Easy Profit - Post Sales Service CRM
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Customer Portal
            </h2>

            {/* Tab Buttons */}
            <div className="grid w-full grid-cols-2 mb-8 gap-2">
              <button
                onClick={() => setActiveTab("login")}
                className={`py-3 px-4 font-medium rounded-lg transition-colors ${
                  activeTab === "login"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`py-3 px-4 font-medium rounded-lg transition-colors ${
                  activeTab === "register"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Register
              </button>
            </div>

            {/* Login Tab */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                  />
                </div>

                {loginError && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{loginError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  Login
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Demo: Try john@example.com (any password) to test existing
                  customer
                </p>
              </form>
            )}

            {/* Register Tab */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                  />
                </div>

                {registerError && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{registerError}</p>
                  </div>
                )}

                {registerSuccess && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">{registerSuccess}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 bg-secondary hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                >
                  Register
                </Button>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                New Customer?
              </h3>
              <p className="text-sm text-gray-600">
                Register to access our product catalog and book services
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">
                Existing Customer?
              </h3>
              <p className="text-sm text-gray-600">
                Login to view invoices, reports, and manage services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
