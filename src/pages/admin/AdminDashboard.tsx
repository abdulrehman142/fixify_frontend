import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import type {
  ProviderListItem,
  OrderListItem,
  Stats,
  CustomerListItem,
  ProviderStatsDetail,
  CustomerStatsDetail,
  ContactMessage,
} from "../../services/adminService";
import authService from "../../services/authService";
import ProviderDetailModal from "../../components/ProviderDetailModal";
import OrderDetailModal from "../../components/OrderDetailModal";
import orderService from "../../services/orderService";
import type { Order } from "../../services/orderService";
import SocialIcon from "../../components/SocialIcon";
import darkModeIconWhite from "/Fixify_images/wdarkmodeicon.jpg";
import darkModeIconDark from "/Fixify_images/ddarkmodeicon.png";
import moonHoverIcon from "/Fixify_images/wmoon.png";
import logoutImg from "/Fixify_images/logout.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "providers" | "customers" | "orders" | "stats" | "contacts"
  >("providers");
  const [loading, setLoading] = useState(true);
  const [serviceProviders, setServiceProviders] = useState<ProviderListItem[]>([]);
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderListItem | null>(null);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [selectedProviderStats, setSelectedProviderStats] = useState<ProviderStatsDetail | null>(
    null
  );
  const [isProviderStatsModalOpen, setIsProviderStatsModalOpen] = useState(false);
  const [selectedCustomerStats, setSelectedCustomerStats] = useState<CustomerStatsDetail | null>(
    null
  );
  const [isCustomerStatsModalOpen, setIsCustomerStatsModalOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [providers, ordersData, statsData, customersData, contactsData] = await Promise.all([
        adminService.getAllProviders(),
        adminService.getAllOrders(),
        adminService.getStats(),
        adminService.getAllCustomers(),
        adminService.getAllContacts(),
      ]);
      setServiceProviders(providers);
      setOrders(ordersData);
      setStats(statsData);
      setCustomers(customersData);
      setContacts(contactsData);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProvider = async (providerId: number) => {
    try {
      await adminService.approveProvider(providerId);
      await loadDashboardData();
      alert("Service provider approved successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to approve provider");
    }
  };

  const handleRejectProvider = async (providerId: number) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      try {
        await adminService.rejectProvider(providerId, reason);
        await loadDashboardData();
        alert("Service provider rejected.");
      } catch (err: any) {
        alert(err.response?.data?.detail || "Failed to reject provider");
      }
    }
  };

  const handleProviderClick = (provider: ProviderListItem) => {
    setSelectedProvider(provider);
    setIsProviderModalOpen(true);
  };

  const handleOrderClick = async (orderListItem: OrderListItem) => {
    try {
      // Fetch full order details
      const fullOrder = await orderService.getOrder(orderListItem.id);
      setSelectedOrder(fullOrder);
      setIsOrderModalOpen(true);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to load order details");
    }
  };

  const handleViewProviderStats = async (providerId: number) => {
    try {
      const providerStats = await adminService.getProviderStats(providerId);
      setSelectedProviderStats(providerStats);
      setIsProviderStatsModalOpen(true);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to load provider statistics");
    }
  };

  const handleViewCustomerStats = async (customerId: number) => {
    try {
      const customerStats = await adminService.getCustomerStats(customerId);
      setSelectedCustomerStats(customerStats);
      setIsCustomerStatsModalOpen(true);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to load customer statistics");
    }
  };

  const handleDeleteProvider = async (providerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "Are you sure you want to delete this service provider? This will also delete their user account and cannot be undone."
      )
    ) {
      return;
    }

    try {
      await adminService.deleteProvider(providerId);
      await loadDashboardData();
      alert("Service provider deleted successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete service provider");
    }
  };

  const handleDeleteCustomer = async (customerId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      !window.confirm(
        "Are you sure you want to delete this customer? This will also delete all their orders and cannot be undone."
      )
    ) {
      return;
    }

    try {
      await adminService.deleteCustomer(customerId);
      await loadDashboardData();
      alert("Customer deleted successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to delete customer");
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const pendingProviders = serviceProviders.filter((p) => p.approval_status === "pending");
  const approvedProviders = serviceProviders.filter((p) => p.approval_status === "approved");

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#231212] dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-black p-4 md:p-8 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#231212] dark:text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <SocialIcon
              darkMode={darkMode}
              lightImg={darkModeIconDark}
              lightHover={moonHoverIcon}
              darkImg={darkModeIconWhite}
              darkHover={darkModeIconWhite}
              alt="Toggle Dark Mode"
              onClick={() => setDarkMode(!darkMode)}
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors"
            >
              <img
                src={logoutImg}
                alt="logout"
                className="h-5 w-5 pointer-events-none"
                loading="lazy"
              />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#231212] dark:bg-gray-800 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{stats.pending_providers}</div>
              <div className="text-sm text-gray-300">Pending Providers</div>
            </div>
            <div className="bg-green-600 dark:bg-green-800 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{stats.approved_providers}</div>
              <div className="text-sm text-gray-200">Approved Providers</div>
            </div>
            <div className="bg-blue-600 dark:bg-blue-800 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{stats.total_orders}</div>
              <div className="text-sm text-gray-200">Total Orders</div>
            </div>
            <div className="bg-yellow-600 dark:bg-yellow-800 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{stats.pending_orders}</div>
              <div className="text-sm text-gray-200">Pending Orders</div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("providers")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "providers"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Service Providers
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "customers"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "orders"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "stats"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "contacts"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {activeTab === "providers" && (
          <div className="space-y-6">
            {/* Pending Providers */}
            <div>
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
                Pending Approvals ({pendingProviders.length})
              </h2>
              {pendingProviders.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No pending provider approvals.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingProviders.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={() => handleProviderClick(provider)}
                      className="bg-white dark:bg-gray-800 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#231212] dark:text-white">
                            {provider.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {provider.service_category}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                          {provider.approval_status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Email:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{provider.email}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Phone:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{provider.phone}</span>
                        </p>
                        {provider.business_name && (
                          <p className="text-sm">
                            <span className="font-semibold text-[#231212] dark:text-white">
                              Business:
                            </span>{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              {provider.business_name}
                            </span>
                          </p>
                        )}
                        {provider.experience_years && (
                          <p className="text-sm">
                            <span className="font-semibold text-[#231212] dark:text-white">
                              Experience:
                            </span>{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              {provider.experience_years} years
                            </span>
                          </p>
                        )}
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            City:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{provider.city}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Applied:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {new Date(provider.applied_date).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveProvider(provider.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectProvider(provider.id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Providers */}
            <div>
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
                Approved Providers ({approvedProviders.length})
              </h2>
              {approvedProviders.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No approved providers yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {approvedProviders.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={() => handleProviderClick(provider)}
                      className="bg-white dark:bg-gray-800 border-2 border-green-400 dark:border-green-600 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#231212] dark:text-white">
                            {provider.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {provider.service_category}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {provider.approval_status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Email:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{provider.email}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            City:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{provider.city}</span>
                        </p>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleViewProviderStats(provider.id)}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-semibold"
                        >
                          View Stats
                        </button>
                        <button
                          onClick={(e) => handleDeleteProvider(provider.id, e)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div>
            <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
              All Customers ({customers.length})
            </h2>
            {customers.length === 0 ? (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No customers found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg">
                  <thead>
                    <tr className="bg-[#231212] dark:bg-gray-700 text-white">
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Total Orders</th>
                      <th className="p-3 text-left">Total Spent</th>
                      <th className="p-3 text-left">Joined</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="p-3 text-[#231212] dark:text-white">{customer.username}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{customer.email}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {customer.total_orders}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          PKR {customer.total_spent.toLocaleString()}
                        </td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">
                          {new Date(customer.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewCustomerStats(customer.id)}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                              View Stats
                            </button>
                            <button
                              onClick={(e) => handleDeleteCustomer(customer.id, e)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg">
                <thead>
                  <tr className="bg-[#231212] dark:bg-gray-700 text-white">
                    <th className="p-3 text-left">Order #</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Service</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="border-b border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-3 text-[#231212] dark:text-white">{order.order_number}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {order.customer_name}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{order.service_name}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300 capitalize">
                        {order.service_category}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{order.service_date}</td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        PKR {order.total_amount}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            order.status === "pending"
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                              : order.status === "assigned"
                                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {order.provider_name || "Unassigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#231212] dark:bg-gray-800 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{stats?.total_customers || 0}</div>
                <div className="text-sm text-gray-300">Total Customers</div>
              </div>
              <div className="bg-green-600 dark:bg-green-800 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{stats?.approved_providers || 0}</div>
                <div className="text-sm text-gray-200">Approved Providers</div>
              </div>
              <div className="bg-blue-600 dark:bg-blue-800 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{stats?.total_orders || 0}</div>
                <div className="text-sm text-gray-200">Total Orders</div>
              </div>
              <div className="bg-purple-600 dark:bg-purple-800 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">
                  PKR {stats?.total_earnings?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-200">Total Earnings</div>
              </div>
            </div>

            {/* Detailed Statistics */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#231212] dark:text-white mb-4">
                  Provider Statistics
                </h3>
                <div className="space-y-3">
                  {stats && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Total Providers:</span>
                        <span className="font-semibold text-[#231212] dark:text-white">
                          {stats.total_providers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Approved:</span>
                        <span className="font-semibold text-green-600">
                          {stats.approved_providers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Pending:</span>
                        <span className="font-semibold text-yellow-600">
                          {stats.pending_providers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Rejected:</span>
                        <span className="font-semibold text-red-600">
                          {stats.rejected_providers}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#231212] dark:text-white mb-4">
                  Order Statistics
                </h3>
                <div className="space-y-3">
                  {stats && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Total Orders:</span>
                        <span className="font-semibold text-[#231212] dark:text-white">
                          {stats.total_orders}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Pending:</span>
                        <span className="font-semibold text-yellow-600">
                          {stats.pending_orders}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Assigned:</span>
                        <span className="font-semibold text-blue-600">{stats.assigned_orders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">In Progress:</span>
                        <span className="font-semibold text-purple-600">
                          {stats.in_progress_orders || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Completed:</span>
                        <span className="font-semibold text-green-600">
                          {stats.completed_orders}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#231212] dark:text-white mb-4">
                  Financial Statistics
                </h3>
                <div className="space-y-3">
                  {stats && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Total Earnings:</span>
                        <span className="font-semibold text-green-600">
                          PKR {stats.total_earnings?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Avg Order Value:</span>
                        <span className="font-semibold text-[#231212] dark:text-white">
                          PKR {stats.average_order_value?.toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Total Customers:</span>
                        <span className="font-semibold text-blue-600">
                          {stats.total_customers || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ProviderDetailModal
        provider={selectedProvider}
        isOpen={isProviderModalOpen}
        onClose={() => {
          setIsProviderModalOpen(false);
          setSelectedProvider(null);
        }}
        onApprove={handleApproveProvider}
        onReject={handleRejectProvider}
      />
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedOrder(null);
        }}
      />

      {/* Provider Stats Modal */}
      {selectedProviderStats && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isProviderStatsModalOpen ? "" : "hidden"}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#231212] dark:text-white">
                  Provider Statistics
                </h2>
                <button
                  onClick={() => {
                    setIsProviderStatsModalOpen(false);
                    setSelectedProviderStats(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {selectedProviderStats.total_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {selectedProviderStats.completed_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                    PKR {selectedProviderStats.total_earnings.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-300">
                    {selectedProviderStats.unique_customers}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unique Customers</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    PKR {selectedProviderStats.average_order_value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-300">
                    {selectedProviderStats.pending_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending Orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Stats Modal */}
      {selectedCustomerStats && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isCustomerStatsModalOpen ? "" : "hidden"}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#231212] dark:text-white">
                  Customer Statistics
                </h2>
                <button
                  onClick={() => {
                    setIsCustomerStatsModalOpen(false);
                    setSelectedCustomerStats(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                    {selectedCustomerStats.total_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-300">
                    {selectedCustomerStats.completed_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                    PKR {selectedCustomerStats.total_spent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    PKR {selectedCustomerStats.average_order_value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                    {selectedCustomerStats.pending_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pending Orders</div>
                </div>
                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-300">
                    {selectedCustomerStats.assigned_orders +
                      selectedCustomerStats.in_progress_orders}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Orders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
            Contact Messages ({contacts.length})
          </h2>
          {contacts.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No contact messages received yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#231212] dark:text-white mb-1">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(contact.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
