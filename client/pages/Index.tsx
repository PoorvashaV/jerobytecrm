import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem(
        "currentCustomer",
        JSON.stringify({
          id: data.customer.id,
          name: data.customer.name,
          email: data.customer.email,
          phone: data.customer.phone,
          address: data.customer.address,
          type: data.customer.type,
          isLoggedIn: true,
        })
      );

      // Reset form
      setLoginEmail("");
      setLoginPassword("");
      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      setLoginError("Network error: Unable to login. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setIsLoading(true);

    if (
      !registerName ||
      !registerEmail ||
      !registerPhone ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      setRegisterError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setRegisterError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Phone validation
    if (registerPhone.length < 10) {
      setRegisterError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    // Password validation
    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          phone: registerPhone,
          address: registerAddress,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Only show success if response is ok
      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem(
          "currentCustomer",
          JSON.stringify({
            id: data.customer.id,
            name: data.customer.name,
            email: data.customer.email,
            phone: data.customer.phone,
            address: data.customer.address,
            type: data.customer.type,
            isLoggedIn: true,
          })
        );

        setRegisterSuccess(
          "Registration successful! Redirecting to dashboard..."
        );

        // Clear form and redirect
        setTimeout(() => {
          setRegisterName("");
          setRegisterEmail("");
          setRegisterPhone("");
          setRegisterAddress("");
          setRegisterPassword("");
          setRegisterConfirmPassword("");
          setIsLoading(false);
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      setRegisterError("Network error: Unable to register. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Logo and Header */}
      <div
        className="pt-8 pb-12 px-4 text-center"
        style={{ backgroundColor: "rgba(74, 144, 226, 1)" }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span
              className="font-bold text-xl"
              style={{ color: "rgba(255, 255, 255, 1)" }}
            >
              JB
            </span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Jerobyte Software
            </h1>
            <p
              className="text-sm md:text-base"
              style={{ color: "rgba(221, 228, 238, 1)" }}
            >
              Easy Profit - Post Sales Service CRM
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex items-center justify-center px-4 pb-12"
        style={{ backgroundColor: "rgba(234, 241, 250, 1)" }}
      >
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
                  className="w-full h-10 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main Street, City, State"
                    value={registerAddress}
                    onChange={(e) => setRegisterAddress(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="reg-confirm-password"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="h-10 rounded-lg border-gray-200"
                    disabled={isLoading}
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
                  disabled={isLoading}
                  className="w-full h-10 bg-secondary hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
                >
                  {isLoading ? "Registering..." : "Register"}
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
