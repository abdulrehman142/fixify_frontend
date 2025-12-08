import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/orderService";
import type { Order } from "../../services/orderService";
import providerService, { type ProviderStats } from "../../services/providerService";
import authService from "../../services/authService";
import OrderDetailModal from "../../components/OrderDetailModal";
import SocialIcon from "../../components/SocialIcon";
import darkModeIconWhite from "/Fixify_images/wdarkmodeicon.jpg";
import darkModeIconDark from "/Fixify_images/ddarkmodeicon.png";
import moonHoverIcon from "/Fixify_images/wmoon.png";
import logoutImg from "/Fixify_images/logout.png";

// Interactive Line Chart Component
interface MonthlyLineChartProps {
  title: string;
  data: Array<{ month: string; month_key: string; earnings?: number; orders?: number }>;
  dataKey: "earnings" | "orders";
  color: string;
  formatValue: (val: number) => string;
  yAxisLabel: string;
}

const MonthlyLineChart = ({
  title,
  data,
  dataKey,
  color,
  formatValue,
  yAxisLabel,
}: MonthlyLineChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const chartData = useMemo(() => {
    return data.map((item) => ({
      label: item.month.split(" ")[0], // Just the month name
      fullLabel: item.month,
      value: item[dataKey] || 0,
    }));
  }, [data, dataKey]);

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);
  const minValue = Math.min(...chartData.map((d) => d.value), 0);

  const chartWidth = 800;
  const chartHeight = 300;
  const padding = { top: 40, right: 40, bottom: 60, left: 80 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const points = chartData.map((d, index) => {
    const x = padding.left + (index / (chartData.length - 1 || 1)) * graphWidth;
    const y =
      padding.top + graphHeight - ((d.value - minValue) / (maxValue - minValue || 1)) * graphHeight;
    return { x, y, ...d, index };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${pathData} L ${points[points.length - 1].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

  const handleMouseMove = (e: React.MouseEvent<SVGElement>, index: number) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[#231212] dark:text-white mb-6">{title}</h3>
      <div className="overflow-x-auto pl-4">
        <svg
          width={chartWidth}
          height={chartHeight}
          className="w-full h-auto"
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + graphHeight - ratio * graphHeight;
            const value = minValue + ratio * (maxValue - minValue);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + graphWidth}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-gray-300 dark:text-gray-700 opacity-50"
                />
                <text
                  x={padding.left - 15}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  {formatValue(Math.round(value))}
                </text>
              </g>
            );
          })}

          {/* Area under curve */}
          <path
            d={areaPath}
            fill={color}
            fillOpacity="0.1"
            className="transition-opacity duration-200"
          />

          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-200"
          />

          {/* Data points and hover interactions */}
          {points.map((point, index) => (
            <g key={index}>
              {/* Invisible larger hit area */}
              <circle
                cx={point.x}
                cy={point.y}
                r="15"
                fill="transparent"
                onMouseMove={(e) => handleMouseMove(e, index)}
                className="cursor-pointer"
              />
              {/* Visible point */}
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === index ? "6" : "4"}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-200"
              />
              {/* X-axis labels */}
              <text
                x={point.x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="text-xs fill-gray-600 dark:fill-gray-400"
                transform={`rotate(-45 ${point.x} ${chartHeight - padding.bottom + 20})`}
              >
                {point.label}
              </text>
            </g>
          ))}

          {/* Tooltip */}
          {hoveredIndex !== null && (
            <g>
              {/* Tooltip background */}
              <rect
                x={tooltipPosition.x - 80}
                y={tooltipPosition.y - 60}
                width="160"
                height="50"
                rx="8"
                fill="rgba(0, 0, 0, 0.85)"
                className="backdrop-blur-sm"
              />
              {/* Tooltip text */}
              <text
                x={tooltipPosition.x}
                y={tooltipPosition.y - 35}
                textAnchor="middle"
                className="text-sm fill-white font-semibold"
              >
                {chartData[hoveredIndex].fullLabel}
              </text>
              <text
                x={tooltipPosition.x}
                y={tooltipPosition.y - 15}
                textAnchor="middle"
                className="text-lg fill-white font-bold"
              >
                {formatValue(chartData[hoveredIndex].value)}
              </text>
              {/* Vertical line at hovered point */}
              <line
                x1={points[hoveredIndex].x}
                y1={padding.top}
                x2={points[hoveredIndex].x}
                y2={padding.top + graphHeight}
                stroke={color}
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </g>
          )}

          {/* Y-axis label */}
          <text
            x={30}
            y={chartHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90 30 ${chartHeight / 2})`}
            className="text-sm fill-gray-600 dark:fill-gray-400 font-semibold"
          >
            {yAxisLabel}
          </text>
        </svg>
      </div>
    </div>
  );
};

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "stats">("orders");
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Check approval status
      const approvalStatus = await providerService.getApprovalStatus();
      setIsApproved(approvalStatus.is_approved);

      if (approvalStatus.is_approved) {
        // Load available orders
        try {
          const available = await orderService.getAvailableOrders();
          setAvailableOrders(available);
        } catch (err: any) {
          if (err.response?.status !== 403) {
            console.error("Error loading available orders:", err);
          }
        }

        // Load provider's orders
        const providerOrders = await orderService.getProviderOrders();
        setOrders(providerOrders);

        // Load stats
        try {
          setStatsLoading(true);
          const providerStats = await providerService.getStats();
          setStats(providerStats);
          setStatsError(null);
        } catch (err: any) {
          console.error("Error loading stats:", err);
          setStatsError(err.response?.data?.detail || "Failed to load statistics");
        } finally {
          setStatsLoading(false);
        }
      }

      // Load profile
      try {
        const profileData = await providerService.getProfile();
        setProfile(profileData);
        setEditFormData({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          phone: profileData.phone,
          business_name: profileData.business_name || "",
          experience_years: profileData.experience_years || "",
          hourly_rate: profileData.hourly_rate || "",
          bio: profileData.bio || "",
          city: profileData.city,
          address: profileData.address || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    } catch (err: any) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePickupOrder = async (orderId: number) => {
    try {
      const updatedOrder = await orderService.pickupOrder(orderId);
      setOrders((prev) => [...prev, updatedOrder]);
      setAvailableOrders((prev) => prev.filter((o) => o.id !== orderId));
      alert("Order picked up successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to pickup order");
    }
  };

  const handleCompleteOrder = async (orderId: number) => {
    try {
      const updatedOrder = await orderService.completeOrder(orderId);
      setOrders((prev) => prev.map((order) => (order.id === orderId ? updatedOrder : order)));
      alert("Order marked as completed!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to complete order");
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditError(null);
    // Reset form data
    if (profile) {
      setEditFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        business_name: profile.business_name || "",
        experience_years: profile.experience_years || "",
        hourly_rate: profile.hourly_rate || "",
        bio: profile.bio || "",
        city: profile.city,
        address: profile.address || "",
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setEditLoading(true);

    try {
      const updateData: any = {};
      if (editFormData.first_name) updateData.first_name = editFormData.first_name;
      if (editFormData.last_name) updateData.last_name = editFormData.last_name;
      if (editFormData.phone) updateData.phone = editFormData.phone;
      if (editFormData.business_name) updateData.business_name = editFormData.business_name;
      if (editFormData.experience_years)
        updateData.experience_years = parseInt(editFormData.experience_years);
      if (editFormData.hourly_rate) updateData.hourly_rate = parseFloat(editFormData.hourly_rate);
      if (editFormData.bio) updateData.bio = editFormData.bio;
      if (editFormData.city) updateData.city = editFormData.city;
      if (editFormData.address) updateData.address = editFormData.address;

      const updatedProfile = await providerService.updateProfile(updateData);
      setProfile(updatedProfile);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err: any) {
      setEditError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#231212] dark:text-white">Loading...</div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
              Profile Pending Approval
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300">
              Your service provider profile is currently under review by our admin team. You will be
              notified once your profile is approved and you can start accepting orders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pendingOrders = availableOrders.filter((order) => order.status === "pending");
  const activeOrders = orders.filter(
    (order) => order.status === "assigned" || order.status === "in_progress"
  );
  const completedOrders = orders.filter((order) => order.status === "completed");

  return (
    <div className={`min-h-screen bg-white dark:bg-black p-4 md:p-8 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#231212] dark:text-white">
            Service Provider Dashboard
          </h1>
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

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-300 dark:border-gray-700">
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
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "profile"
                ? "border-b-2 border-[#231212] dark:border-white text-[#231212] dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Profile
          </button>
        </div>

        {activeTab === "orders" ? (
          <div className="space-y-6">
            {/* Pending Orders */}
            <div>
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
                Available Orders ({pendingOrders.length})
              </h2>
              {pendingOrders.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    No pending orders available at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#231212] dark:text-white">
                            {order.service_name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Order #{order.order_number}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded text-xs">
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Customer:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.customer?.username || "N/A"}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Date:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.service_date} at {order.service_time}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Address:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{order.address}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Amount:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            PKR {order.total_amount}
                          </span>
                        </p>
                        {order.special_instructions && (
                          <p className="text-sm">
                            <span className="font-semibold text-[#231212] dark:text-white">
                              Instructions:
                            </span>{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              {order.special_instructions}
                            </span>
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handlePickupOrder(order.id)}
                        className="w-full px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors font-semibold"
                      >
                        Pick Up Order
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Orders */}
            <div>
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
                My Active Orders ({activeOrders.length})
              </h2>
              {activeOrders.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No active orders.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#231212] dark:text-white">
                            {order.service_name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Order #{order.order_number}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Customer:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.customer?.username || "N/A"}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Date:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.service_date} at {order.service_time}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Address:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">{order.address}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Orders */}
            <div>
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
                Completed Orders ({completedOrders.length})
              </h2>
              {completedOrders.length === 0 ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">No completed orders yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {completedOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-lg opacity-75 cursor-pointer hover:opacity-100 hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-[#231212] dark:text-white">
                            {order.service_name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Order #{order.order_number}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Customer:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.customer?.username || "N/A"}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-[#231212] dark:text-white">
                            Completed:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {order.service_date}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeTab === "stats" ? (
          <div className="space-y-6">
            {statsLoading ? (
              <div className="text-center py-8">
                <div className="text-[#231212] dark:text-white">Loading statistics...</div>
              </div>
            ) : statsError ? (
              <div className="bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{statsError}</p>
              </div>
            ) : stats ? (
              <>
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#231212] dark:bg-gray-800 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold">{stats.total_orders}</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400 mt-1">
                      Total Orders
                    </div>
                  </div>
                  <div className="bg-green-600 dark:bg-green-800 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold">{stats.completed_orders}</div>
                    <div className="text-sm text-gray-200 dark:text-gray-300 mt-1">Completed</div>
                  </div>
                  <div className="bg-blue-600 dark:bg-blue-800 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold">
                      PKR {stats.total_earnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-200 dark:text-gray-300 mt-1">
                      Total Earnings
                    </div>
                  </div>
                  <div className="bg-purple-600 dark:bg-purple-800 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold">{stats.unique_customers}</div>
                    <div className="text-sm text-gray-200 dark:text-gray-300 mt-1">
                      Unique Customers
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#231212] dark:text-white">
                      PKR {stats.average_order_value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Average Order Value
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#231212] dark:text-white">
                      {stats.pending_orders}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Pending Orders
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#231212] dark:text-white">
                      {stats.in_progress_orders}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Progress</div>
                  </div>
                </div>

                {/* Monthly Earnings Chart */}
                <MonthlyLineChart
                  title="Monthly Earnings (Last 12 Months)"
                  data={stats.monthly_stats}
                  dataKey="earnings"
                  color="#3B82F6"
                  formatValue={(val) => `PKR ${val.toLocaleString()}`}
                  yAxisLabel="Earnings (PKR)"
                />

                {/* Monthly Orders Chart */}
                <MonthlyLineChart
                  title="Monthly Orders (Last 12 Months)"
                  data={stats.monthly_stats}
                  dataKey="orders"
                  color="#10B981"
                  formatValue={(val) => `${val} orders`}
                  yAxisLabel="Orders"
                />
              </>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No statistics available.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#231212] dark:text-white">My Profile</h2>
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editError && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">{editError}</p>
              </div>
            )}

            {profile ? (
              isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Service Category
                    </label>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">
                      {profile.service_category}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cannot be changed</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={editFormData.first_name}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editFormData.last_name}
                        onChange={handleEditInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={editFormData.business_name}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        name="experience_years"
                        value={editFormData.experience_years}
                        onChange={handleEditInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        Hourly Rate (PKR)
                      </label>
                      <input
                        type="number"
                        name="hourly_rate"
                        value={editFormData.hourly_rate}
                        onChange={handleEditInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={editFormData.bio}
                      onChange={handleEditInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={editLoading}
                      className="px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      {editLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Service Category
                    </label>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">
                      {profile.service_category}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Name
                    </label>
                    <p className="text-gray-700 dark:text-gray-300">
                      {profile.first_name} {profile.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Email
                    </label>
                    <p className="text-gray-700 dark:text-gray-300">
                      {profile.user?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                      Phone
                    </label>
                    <p className="text-gray-700 dark:text-gray-300">{profile.phone}</p>
                  </div>
                  {profile.business_name && (
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        Business Name
                      </label>
                      <p className="text-gray-700 dark:text-gray-300">{profile.business_name}</p>
                    </div>
                  )}
                  {profile.city && (
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        City
                      </label>
                      <p className="text-gray-700 dark:text-gray-300">{profile.city}</p>
                    </div>
                  )}
                  {profile.hourly_rate && (
                    <div>
                      <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
                        Hourly Rate
                      </label>
                      <p className="text-gray-700 dark:text-gray-300">PKR {profile.hourly_rate}</p>
                    </div>
                  )}
                </div>
              )
            ) : (
              <p className="text-gray-700 dark:text-gray-300">Loading profile...</p>
            )}
          </div>
        )}
      </div>
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default ProviderDashboard;
