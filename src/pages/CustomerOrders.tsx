import { useState, useEffect } from "react";
import type { Order } from "../services/orderService";
import orderService from "../services/orderService";
import reviewService from "../services/reviewService";
import type { Review } from "../services/reviewService";
import OrderDetailModal from "../components/OrderDetailModal";
import RescheduleOrderModal from "../components/RescheduleOrderModal";
import ReviewModal from "../components/ReviewModal";

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToReschedule, setOrderToReschedule] = useState<Order | null>(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [orderToReview, setOrderToReview] = useState<Order | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [orderReviews, setOrderReviews] = useState<Map<number, Review>>(new Map());

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const customerOrders = await orderService.getCustomerOrders();
      setOrders(customerOrders);

      // Load reviews for completed orders
      const completedOrderIds = customerOrders
        .filter((order) => order.status === "completed")
        .map((order) => order.id);

      const reviewsMap = new Map<number, Review>();
      await Promise.all(
        completedOrderIds.map(async (orderId) => {
          try {
            const review = await reviewService.getReviewByOrder(orderId);
            reviewsMap.set(orderId, review);
          } catch (err) {
            // Review doesn't exist yet, that's okay
          }
        })
      );
      setOrderReviews(reviewsMap);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // Categorize orders by status
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const assignedOrders = orders.filter((order) => order.status === "assigned");
  const inProgressOrders = orders.filter((order) => order.status === "in_progress");
  const completedOrders = orders.filter((order) => order.status === "completed");

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (e: React.MouseEvent, orderId: number) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      setIsDeleting(orderId);
      await orderService.deleteOrder(orderId);
      await loadOrders(); // Reload orders after deletion
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete order");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRescheduleOrder = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation(); // Prevent triggering the card click
    setOrderToReschedule(order);
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleSuccess = async () => {
    setIsRescheduleModalOpen(false);
    setOrderToReschedule(null);
    await loadOrders(); // Reload orders after rescheduling
  };

  const handleReviewClick = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation(); // Prevent triggering the card click
    setOrderToReview(order);
    setIsReviewModalOpen(true);
  };

  const handleReviewSuccess = async () => {
    setIsReviewModalOpen(false);
    setOrderToReview(null);
    await loadOrders(); // Reload orders to get the new review
  };

  const renderOrderCard = (order: Order) => (
    <div
      key={order.id}
      onClick={() => handleOrderClick(order)}
      className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-[#231212] dark:text-white">{order.service_name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Order #{order.order_number}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            order.status === "pending"
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
              : order.status === "assigned"
                ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                : order.status === "in_progress"
                  ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          }`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <p className="text-sm">
          <span className="font-semibold text-[#231212] dark:text-white">Date:</span>{" "}
          <span className="text-gray-700 dark:text-gray-300">
            {order.service_date} at {order.service_time}
          </span>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-[#231212] dark:text-white">Address:</span>{" "}
          <span className="text-gray-700 dark:text-gray-300">{order.address}</span>
        </p>
        <p className="text-sm">
          <span className="font-semibold text-[#231212] dark:text-white">Amount:</span>{" "}
          <span className="text-gray-700 dark:text-gray-300">PKR {order.total_amount}</span>
        </p>
        {order.service_provider && (
          <p className="text-sm">
            <span className="font-semibold text-[#231212] dark:text-white">Provider:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">
              {order.service_provider.first_name} {order.service_provider.last_name}
            </span>
          </p>
        )}
        {order.special_instructions && (
          <p className="text-sm">
            <span className="font-semibold text-[#231212] dark:text-white">Instructions:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300">{order.special_instructions}</span>
          </p>
        )}
      </div>
      {/* Action buttons for pending orders */}
      {order.status === "pending" && (
        <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => handleRescheduleOrder(e, order)}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors text-sm font-medium"
          >
            Reschedule
          </button>
          <button
            onClick={(e) => handleDeleteOrder(e, order.id)}
            disabled={isDeleting === order.id}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded transition-colors text-sm font-medium"
          >
            {isDeleting === order.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {/* Review button for completed orders */}
      {order.status === "completed" && (
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          {orderReviews.has(order.id) ? (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Reviewed ({orderReviews.get(order.id)?.rating}/5 ⭐)
              </span>
            </div>
          ) : (
            <button
              onClick={(e) => handleReviewClick(e, order)}
              className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              ⭐ Write a Review
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#231212] dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#231212] dark:text-white">My Orders</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Pending Orders */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
            Pending Orders ({pendingOrders.length})
          </h2>
          {pendingOrders.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No pending orders.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingOrders.map(renderOrderCard)}
            </div>
          )}
        </div>

        {/* Assigned Orders */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
            Assigned Orders ({assignedOrders.length})
          </h2>
          {assignedOrders.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No assigned orders.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignedOrders.map(renderOrderCard)}
            </div>
          )}
        </div>

        {/* In Progress Orders */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
            In Progress Orders ({inProgressOrders.length})
          </h2>
          {inProgressOrders.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No in-progress orders.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgressOrders.map(renderOrderCard)}
            </div>
          )}
        </div>

        {/* Completed Orders */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#231212] dark:text-white mb-4">
            Completed Orders ({completedOrders.length})
          </h2>
          {completedOrders.length === 0 ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No completed orders yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedOrders.map(renderOrderCard)}
            </div>
          )}
        </div>
      </div>
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
      {orderToReschedule && (
        <RescheduleOrderModal
          order={orderToReschedule}
          isOpen={isRescheduleModalOpen}
          onClose={() => {
            setIsRescheduleModalOpen(false);
            setOrderToReschedule(null);
          }}
          onSuccess={handleRescheduleSuccess}
        />
      )}
      {orderToReview && (
        <ReviewModal
          order={orderToReview}
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setOrderToReview(null);
          }}
          onSuccess={handleReviewSuccess}
          existingReview={orderReviews.get(orderToReview.id) || null}
        />
      )}
    </div>
  );
};

export default CustomerOrders;
