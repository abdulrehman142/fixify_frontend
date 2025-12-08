import { useState, useEffect } from "react";
import reviewService from "../services/reviewService";
import type { Review } from "../services/reviewService";
import type { Order } from "../services/orderService";

interface ReviewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingReview?: Review | null;
}

const ReviewModal = ({ order, isOpen, onClose, onSuccess, existingReview }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || "");
    } else {
      setRating(0);
      setComment("");
    }
    setError(null);
  }, [existingReview, isOpen]);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await reviewService.createReview({
        order_id: order.id,
        rating,
        comment: comment.trim() || undefined,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const StarIcon = ({ filled, hovered }: { filled: boolean; hovered: boolean }) => (
    <svg
      className={`w-10 h-10 transition-all duration-200 ${
        filled || hovered ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
      }`}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#231212] to-[#422727] dark:from-gray-700 dark:to-gray-800 rounded-t-2xl p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {existingReview ? "Your Review" : "Rate Your Experience"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-200 text-sm mt-2">
            Order #{order.order_number} - {order.service_name}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Star Rating */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-3">
              Your Rating *
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transform transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
                  disabled={loading || !!existingReview}
                >
                  <StarIcon
                    filled={star <= (hoveredRating || rating)}
                    hovered={star <= hoveredRating && hoveredRating > rating}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#231212] dark:text-white mb-2">
              Your Review (Optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this service..."
              rows={4}
              maxLength={500}
              disabled={loading || !!existingReview}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#231212] dark:focus:ring-gray-500 transition-all resize-none disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Provider Info */}
          {order.service_provider && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Service Provider:</p>
              <p className="font-semibold text-[#231212] dark:text-white">
                {order.service_provider.first_name} {order.service_provider.last_name}
              </p>
            </div>
          )}

          {/* Buttons */}
          {!existingReview && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#231212] to-[#422727] dark:from-gray-700 dark:to-gray-800 text-white rounded-lg hover:from-[#422727] hover:to-[#231212] dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          )}

          {existingReview && (
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 text-center">
                ✓ You have already reviewed this order
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
