import { useState, useEffect, useRef } from "react";
import type { Order } from "../services/orderService";
import messageService, { type Message } from "../services/messageService";
import { useAuth } from "../contexts/AuthContext";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const canMessage = order && order.status !== "pending" && order.service_provider;

  useEffect(() => {
    if (isOpen && order && canMessage) {
      loadMessages();
      // Poll for new messages every 5 seconds
      const interval = setInterval(loadMessages, 5000);
      return () => clearInterval(interval);
    } else {
      setMessages([]);
    }
  }, [isOpen, order?.id, canMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    if (!order) return;
    try {
      setLoading(true);
      const orderMessages = await messageService.getMessagesForOrder(order.id);
      setMessages(orderMessages);
      setError(null);
    } catch (err: any) {
      // Show error only if it's not a 404 (no messages yet is fine)
      if (err.response?.status === 404) {
        setMessages([]);
      } else {
        setError(err.response?.data?.detail || "Failed to load messages");
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setSending(true);
    setError(null);

    try {
      const sentMessage = await messageService.sendMessage({
        order_id: order.id,
        message_text: messageText,
      });
      setMessages((prev) => [...prev, sentMessage]);
      scrollToBottom();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to send message");
      setNewMessage(messageText); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#231212] dark:text-white">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">
                Order Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Order Number:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{order.order_number}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Service Name:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{order.service_name}</span>
                </p>
                {order.service_category && (
                  <p className="text-sm">
                    <span className="font-semibold text-[#231212] dark:text-white">
                      Service Category:
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {order.service_category}
                    </span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs inline-block ${
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
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">Service Details</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Date:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{order.service_date}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Time:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{order.service_time}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Total Amount:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">PKR {order.total_amount}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">Address</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">{order.address}</p>
                {order.city && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    City: {order.city}
                  </p>
                )}
                {order.postal_code && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Postal Code: {order.postal_code}
                  </p>
                )}
              </div>
            </div>

            {order.special_instructions && (
              <div>
                <h3 className="font-semibold text-[#231212] dark:text-white mb-2">
                  Special Instructions
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {order.special_instructions}
                  </p>
                </div>
              </div>
            )}

            {order.service_provider && (
              <div>
                <h3 className="font-semibold text-[#231212] dark:text-white mb-2">
                  Assigned Provider
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-[#231212] dark:text-white">Name:</span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {order.service_provider.first_name} {order.service_provider.last_name}
                    </span>
                  </p>
                  {order.service_provider.phone && (
                    <p className="text-sm">
                      <span className="font-semibold text-[#231212] dark:text-white">Phone:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        {order.service_provider.phone}
                      </span>
                    </p>
                  )}
                  {order.service_provider.service_category && (
                    <p className="text-sm">
                      <span className="font-semibold text-[#231212] dark:text-white">
                        Category:
                      </span>{" "}
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {order.service_provider.service_category}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">Timestamps</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Created:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Last Updated:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(order.updated_at).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Messages Section */}
            {canMessage && (
              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4">
                <h3 className="font-semibold text-[#231212] dark:text-white mb-3">Messages</h3>

                {error && (
                  <div className="mb-3 p-2 bg-red-100 dark:bg-red-900 border border-red-400 rounded text-sm">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                  </div>
                )}

                {/* Messages Container */}
                <div
                  ref={messagesContainerRef}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3 h-64 overflow-y-auto border-2 border-gray-200 dark:border-gray-700"
                >
                  {loading && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 dark:text-gray-400">Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => {
                        const isCurrentUser =
                          user &&
                          ((user.role === "customer" &&
                            message.sender_type === "customer" &&
                            message.sender_id === user.id) ||
                            (user.role === "service_provider" &&
                              message.sender_type === "service_provider" &&
                              message.sender_id === user.id));

                        return (
                          <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-lg p-3 ${
                                isCurrentUser
                                  ? "bg-blue-600 text-white"
                                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`text-xs font-semibold ${
                                    isCurrentUser
                                      ? "text-blue-100"
                                      : "text-gray-600 dark:text-gray-400"
                                  }`}
                                >
                                  {message.sender_type === "customer" ? "Customer" : "Provider"}
                                  {message.sender_username && ` (${message.sender_username})`}
                                </span>
                              </div>
                              <p
                                className={`text-sm ${
                                  isCurrentUser ? "text-white" : "text-gray-900 dark:text-white"
                                }`}
                              >
                                {message.message_text}
                              </p>
                              <p
                                className={`text-xs mt-1 ${
                                  isCurrentUser
                                    ? "text-blue-100"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    maxLength={1000}
                    disabled={sending}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#231212] dark:focus:ring-gray-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || sending}
                    className="px-6 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded-lg hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            )}

            {!canMessage && order.status === "pending" && (
              <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4">
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Messaging will be available once the order is assigned to a service provider.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
