import { useState, useEffect } from "react";
import type { Order } from "../services/orderService";
import orderService from "../services/orderService";

interface RescheduleOrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RescheduleOrderModal: React.FC<RescheduleOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [serviceDate, setServiceDate] = useState(order.service_date);
  const [serviceTime, setServiceTime] = useState(order.service_time);
  const [address, setAddress] = useState(order.address);
  const [city, setCity] = useState(order.city || "");
  const [postalCode, setPostalCode] = useState(order.postal_code || "");
  const [specialInstructions, setSpecialInstructions] = useState(order.special_instructions || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setServiceDate(order.service_date);
      setServiceTime(order.service_time);
      setAddress(order.address);
      setCity(order.city || "");
      setPostalCode(order.postal_code || "");
      setSpecialInstructions(order.special_instructions || "");
      setError(null);
    }
  }, [isOpen, order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const updateData: {
        service_date?: string;
        service_time?: string;
        address?: string;
        city?: string;
        postal_code?: string;
        special_instructions?: string;
      } = {};

      if (serviceDate !== order.service_date) {
        updateData.service_date = serviceDate;
      }
      if (serviceTime !== order.service_time) {
        updateData.service_time = serviceTime;
      }
      if (address !== order.address) {
        updateData.address = address;
      }
      if (city !== order.city) {
        updateData.city = city;
      }
      if (postalCode !== order.postal_code) {
        updateData.postal_code = postalCode;
      }
      if (specialInstructions !== order.special_instructions) {
        updateData.special_instructions = specialInstructions;
      }

      // Only send request if there are changes
      if (Object.keys(updateData).length > 0) {
        await orderService.rescheduleOrder(order.id, updateData);
        onSuccess();
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to reschedule order");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#231212] dark:text-white">
              Reschedule Order #{order.order_number}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 rounded text-red-800 dark:text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                Service Date *
              </label>
              <input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                required
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                Service Time *
              </label>
              <input
                type="time"
                value={serviceTime}
                onChange={(e) => setServiceTime(e.target.value)}
                required
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
                className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-[#231212] dark:text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#231212] dark:bg-white hover:bg-[#422727] dark:hover:bg-gray-200 text-white dark:text-black rounded transition-colors disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescheduleOrderModal;
