import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Index() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    customerType: "product",
  });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    console.log(`🔄 Changing ${field} to:`, value); // 🔍 DEBUG
    setFormData({ ...formData, [field]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // ✅ Check if response is OK first
      if (!res.ok) {
        setLoginError(`Server error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();
      console.log("Login response:", data); // 🔍 Debug log

      if (!data.success) {
        setLoginError(data.message || "Login failed");
        return;
      }

      // ✅ Verify user object exists
      if (!data.user) {
        setLoginError("Invalid response: user data missing");
        return;
      }

      localStorage.setItem(
        "currentCustomer",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || "",
          address: data.user.address || "",
          type: data.user.customer_type,
          isLoggedIn: true,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Login failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setIsLoading(true);

    // ✅ Validation
    if (formData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    // 🔍 DEBUG: Log form data before sending
    console.log("📝 Form Data Before Sending:", formData);
    console.log("📝 customerType value being sent:", formData.customerType);
    console.log("📝 customerType type:", typeof formData.customerType);

    try {
      const requestPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        customer_type: formData.customerType, // 🔑 CRITICAL - snake_case
      };

      console.log("🚀 Request Payload Being Sent:", requestPayload); // 🔍 DEBUG

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      if (!res.ok) {
        setRegisterError(`Server error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();
      console.log("✅ Register response:", data); // 🔍 Debug log
      console.log("✅ Received customer_type:", data.user?.customer_type); // 🔍 DEBUG

      if (!data.success) {
        setRegisterError(data.message || "Registration failed");
        return;
      }

      if (!data.user) {
        setRegisterError("Invalid response: user data missing");
        return;
      }

      const customerData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || "",
        address: data.user.address || "",
        type: data.user.customer_type,
        isLoggedIn: true,
      };

      console.log("💾 Storing in localStorage:", customerData); // 🔍 DEBUG

      localStorage.setItem("currentCustomer", JSON.stringify(customerData));

      setRegisterSuccess("Registration successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🆕 BLUE HEADER BAR WITH LOGO */}
      <header className="bg-blue-600 border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">JB</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block text-white">
              Jerobyte CRM
            </h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - CENTERED FORM */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h1>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="customerType">Account Type</Label>
                  <select
                    id="customerType"
                    value={formData.customerType}
                    onChange={(e) => {
                      console.log("🎯 Selected Account Type:", e.target.value); // 🔍 DEBUG
                      handleChange("customerType", e.target.value);
                    }}
                    className="w-full border rounded-lg p-2 bg-white"
                    required
                  >
                    <option value="">-- Select Account Type --</option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                    <option value="both">Both</option>
                  </select>
                  {/* Show selected value for debugging */}
                  <p className="text-xs text-gray-500 mt-1">
                    Current selection: <span className="font-semibold">{formData.customerType || "Not selected"}</span>
                  </p>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>

            {isLogin && loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <p className="text-sm">{loginError}</p>
              </div>
            )}
            {!isLogin && registerError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <p className="text-sm">{registerError}</p>
              </div>
            )}
            {!isLogin && registerSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <p className="text-sm">{registerSuccess}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-blue-600 text-white font-medium rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setLoginError("");
                setRegisterError("");
                setRegisterSuccess("");
                // Reset form when switching modes
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  password: "",
                  customerType: "product",
                });
              }}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
