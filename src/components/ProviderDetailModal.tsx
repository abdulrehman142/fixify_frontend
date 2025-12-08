import type { ProviderListItem } from "../services/adminService";

interface ProviderDetailModalProps {
  provider: ProviderListItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  provider,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!isOpen || !provider) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#231212] dark:text-white">Provider Details</h2>
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
                Basic Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Name:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{provider.name}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Email:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{provider.email}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">Phone:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{provider.phone}</span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Service Category:
                  </span>{" "}
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {provider.service_category}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">
                    Approval Status:
                  </span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs inline-block ${
                      provider.approval_status === "approved"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : provider.approval_status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {provider.approval_status}
                  </span>
                </p>
              </div>
            </div>

            {provider.business_name && (
              <div>
                <h3 className="font-semibold text-[#231212] dark:text-white mb-2">
                  Business Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-[#231212] dark:text-white">
                      Business Name:
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {provider.business_name}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">Location</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <p className="text-sm">
                  <span className="font-semibold text-[#231212] dark:text-white">City:</span>{" "}
                  <span className="text-gray-700 dark:text-gray-300">{provider.city}</span>
                </p>
              </div>
            </div>

            {provider.experience_years && (
              <div>
                <h3 className="font-semibold text-[#231212] dark:text-white mb-2">Experience</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-[#231212] dark:text-white">
                      Years of Experience:
                    </span>{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                      {provider.experience_years} years
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-[#231212] dark:text-white mb-2">
                Application Date
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {new Date(provider.applied_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            {provider.approval_status === "pending" && onApprove && onReject && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    onApprove(provider.id);
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    onReject(provider.id);
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold"
                >
                  Reject
                </button>
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

export default ProviderDetailModal;
