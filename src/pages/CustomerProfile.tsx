import { useState, useEffect } from "react";
import customerService, {
  type CustomerProfile,
  type CustomerProfileUpdate,
} from "../services/customerService";

const CustomerProfile = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<CustomerProfileUpdate>({
    username: "",
    email: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await customerService.getProfile();
      setProfile(profileData);
      setEditFormData({
        username: profileData.username,
        email: profileData.email,
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditError(null);
    setSuccessMessage(null);
    if (profile) {
      setEditFormData({
        username: profile.username,
        email: profile.email,
      });
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditError(null);
    setSuccessMessage(null);
    if (profile) {
      setEditFormData({
        username: profile.username,
        email: profile.email,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setSuccessMessage(null);
    setEditLoading(true);

    try {
      // Only send fields that have changed
      const updateData: CustomerProfileUpdate = {};
      if (editFormData.username !== profile?.username) {
        updateData.username = editFormData.username;
      }
      if (editFormData.email !== profile?.email) {
        updateData.email = editFormData.email;
      }

      // Only make request if there are changes
      if (Object.keys(updateData).length > 0) {
        const updatedProfile = await customerService.updateProfile(updateData);
        setProfile(updatedProfile);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
      } else {
        setIsEditing(false);
      }
    } catch (err: any) {
      setEditError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#231212] dark:text-white">Loading...</div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#231212] dark:text-white mb-6">My Profile</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border-2 border-green-400 rounded-lg">
            <p className="text-green-800 dark:text-green-200">{successMessage}</p>
          </div>
        )}

        {editError && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{editError}</p>
          </div>
        )}

        {!isEditing ? (
          <div className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                  Username
                </label>
                <p className="text-gray-700 dark:text-gray-300">{profile?.username}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                  Email
                </label>
                <p className="text-gray-700 dark:text-gray-300">{profile?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                  Account Created
                </label>
                <p className="text-gray-700 dark:text-gray-300">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-[#231212] dark:bg-white text-white dark:text-black rounded hover:bg-[#422727] dark:hover:bg-gray-200 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 border-2 border-[#231212] dark:border-gray-600 rounded-lg p-6 shadow-lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#231212] dark:text-white mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-[#231212] dark:text-white focus:outline-none focus:border-[#231212] dark:focus:border-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  disabled={editLoading}
                  className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-[#231212] dark:text-white rounded transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 px-4 py-2 bg-[#231212] dark:bg-white hover:bg-[#422727] dark:hover:bg-gray-200 text-white dark:text-black rounded transition-colors disabled:opacity-50"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
