import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import orderService from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get service info from location state or default values
  const serviceName = (location.state as any)?.serviceName || "Service";
  const originalAmount = (location.state as any)?.amount || 0;
  const minimumAmount = Math.round(originalAmount * 0.8); // 80% of original

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    serviceDate: "",
    serviceTime: "",
    specialInstructions: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    customAmount: originalAmount.toString(), // Start with original amount
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate amount when it changes
    if (name === "customAmount") {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < minimumAmount) {
        setAmountError(`Minimum amount is PKR ${minimumAmount.toLocaleString()}`);
      } else {
        setAmountError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAmountError(null);

    // Validate amount before submission
    const customAmount = parseFloat(formData.customAmount);
    if (isNaN(customAmount) || customAmount < minimumAmount) {
      setAmountError(`Minimum amount is PKR ${minimumAmount.toLocaleString()}`);
      return;
    }

    setLoading(true);

    try {
      // Create order (payment processing would happen here in a real app)
      await orderService.createOrder({
        service_name: serviceName,
        service_date: formData.serviceDate,
        service_time: formData.serviceTime,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        total_amount: customAmount,
        special_instructions: formData.specialInstructions || undefined,
      });

      alert("Order placed successfully!");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Checkout</h1>

        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
            <span className="font-semibold">Service:</span> {serviceName}
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
            <span className="font-semibold">Original Price:</span> PKR{" "}
            {originalAmount.toLocaleString()}
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
            <span className="font-semibold">Minimum Price:</span> PKR{" "}
            {minimumAmount.toLocaleString()} (80% of original)
          </p>
          <p className="text-sm font-bold text-blue-900 dark:text-blue-100">
            <span className="font-semibold">Your Price:</span> PKR{" "}
            {parseFloat(formData.customAmount) >= minimumAmount
              ? parseFloat(formData.customAmount).toLocaleString()
              : "—"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Service Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="serviceDate"
              placeholder="Service Date"
              value={formData.serviceDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="serviceTime"
              placeholder="Service Time"
              value={formData.serviceTime}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address Information */}
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            name="specialInstructions"
            placeholder="Special Instructions (Optional)"
            value={formData.specialInstructions}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Custom Price */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Service Price (PKR) *
            </label>
            <input
              type="number"
              name="customAmount"
              placeholder={`Minimum: PKR ${minimumAmount.toLocaleString()}`}
              value={formData.customAmount}
              onChange={handleInputChange}
              min={minimumAmount}
              step="100"
              required
              className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 ${
                amountError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
            />
            {amountError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{amountError}</p>
            )}
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              You can set a custom price, but it must be at least 80% of the original price (PKR{" "}
              {minimumAmount.toLocaleString()})
            </p>
          </div>

          {/* Payment Information */}
          <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-900 dark:text-white">
            Payment Details
          </h3>

          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number (16 digits)"
            maxLength={16}
            value={formData.cardNumber}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              maxLength={5}
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV (3 digits)"
              maxLength={3}
              value={formData.cvv}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
