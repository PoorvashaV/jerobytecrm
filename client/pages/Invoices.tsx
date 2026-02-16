import { useState, useEffect } from "react";
import { ArrowLeft, Download, FileText, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  type: "product" | "service";
  status: "paid" | "pending";
  description: string;
}

interface Report {
  id: string;
  title: string;
  type: "product" | "service";
  date: string;
  fileSize: string;
}

export default function Invoices() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"invoices" | "reports">(
    "invoices"
  );

  useEffect(() => {
    const stored = localStorage.getItem("currentCustomer");
    if (stored) {
      setCustomer(JSON.parse(stored));
    }
  }, []);

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNo: "INV-2024-001",
      date: "2024-01-15",
      amount: 299.99,
      type: "product",
      status: "paid",
      description: "Pro Software License",
    },
    {
      id: "2",
      invoiceNo: "INV-2024-002",
      date: "2024-01-20",
      amount: 149.99,
      type: "service",
      status: "paid",
      description: "Service Appointment - Technical Support",
    },
    {
      id: "3",
      invoiceNo: "INV-2024-003",
      date: "2024-02-05",
      amount: 99.99,
      type: "product",
      status: "pending",
      description: "Cloud Storage Upgrade",
    },
  ];

  const reports: Report[] = [
    {
      id: "1",
      title: "Q4 2024 Product Usage Report",
      type: "product",
      date: "2024-01-10",
      fileSize: "2.3 MB",
    },
    {
      id: "2",
      title: "Service History Report - 2024",
      type: "service",
      date: "2024-01-15",
      fileSize: "1.8 MB",
    },
    {
      id: "3",
      title: "Annual Performance Report",
      type: "product",
      date: "2024-01-20",
      fileSize: "3.1 MB",
    },
    {
      id: "4",
      title: "Service Quality Assessment",
      type: "service",
      date: "2024-02-01",
      fileSize: "1.2 MB",
    },
  ];

  // Filter based on customer type
  const getAvailableInvoices = () => {
    if (customer?.type === "both") return invoices;
    if (customer?.type === "product")
      return invoices.filter((inv) => inv.type === "product");
    return invoices.filter((inv) => inv.type === "service");
  };

  const getAvailableReports = () => {
    if (customer?.type === "both") return reports;
    if (customer?.type === "product")
      return reports.filter((rep) => rep.type === "product");
    return reports.filter((rep) => rep.type === "service");
  };

  const handleDownload = (fileName: string) => {
    // Simulate download
    alert(`Downloading: ${fileName}\n\nThis is a demo. In production, this would download the actual file.`);
  };

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">Loading...</div>
      </DashboardLayout>
    );
  }

  const availableInvoices = getAvailableInvoices();
  const availableReports = getAvailableReports();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Invoices & Reports
            </h1>
            <p className="text-gray-600 mt-1">
              Download your financial documents and reports
            </p>
          </div>
        </div>

        {/* Customer Type Info */}
        <div className="mb-8 p-4 rounded-lg border border-blue-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Account Type:</p>
              <p className="text-blue-800">
                {customer.type === "both"
                  ? "You have access to both Product and Service documents"
                  : customer.type === "product"
                  ? "You have access to Product invoices and reports only"
                  : "You have access to Service invoices and reports only"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "invoices"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Invoices
            <span className="ml-2 text-sm text-gray-500">
              ({availableInvoices.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "reports"
                ? "text-primary border-primary"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            Reports
            <span className="ml-2 text-sm text-gray-500">
              ({availableReports.length})
            </span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "invoices" ? (
          <div className="space-y-4">
            {availableInvoices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No invoices available</p>
              </div>
            ) : (
              availableInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-gray-900">
                          {invoice.invoiceNo}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            invoice.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {invoice.type === "product" ? "Product" : "Service"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {invoice.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(invoice.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-2xl font-bold text-primary">
                        ${invoice.amount.toFixed(2)}
                      </p>
                      <Button
                        onClick={() =>
                          handleDownload(`${invoice.invoiceNo}.pdf`)
                        }
                        className="bg-secondary hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {availableReports.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No reports available</p>
              </div>
            ) : (
              availableReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-gray-900">
                          {report.title}
                        </h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {report.type === "product" ? "Product" : "Service"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                        <span>{report.fileSize}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(`${report.title}.pdf`)}
                      className="bg-secondary hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
