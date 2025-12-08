import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

// Import service category images
import cleanerImg from "/Fixify_images/cleaner.png";
import electricianImg from "/Fixify_images/electrician.svg";
import plumberImg from "/Fixify_images/plumber.svg";
import mechanicImg from "/Fixify_images/mechanic.png";
import moverImg from "/Fixify_images/mover.png";
import technicianImg from "/Fixify_images/technician.png";
import painterImg from "/Fixify_images/painter.svg";
import gardenerImg from "/Fixify_images/gardener.png";
import carpenterImg from "/Fixify_images/carpenter.svg";

interface ServiceCategory {
  id: string;
  name: string;
  image: string;
}

const RegisterProvider = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    experienceYears: "",
    hourlyRate: "",
    bio: "",
    city: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceCategories: ServiceCategory[] = [
    { id: "cleaner", name: "Cleaner", image: cleanerImg },
    { id: "electrician", name: "Electrician", image: electricianImg },
    { id: "plumber", name: "Plumber", image: plumberImg },
    { id: "mechanic", name: "Mechanic", image: mechanicImg },
    { id: "mover", name: "Mover", image: moverImg },
    { id: "technician", name: "Technician", image: technicianImg },
    { id: "painter", name: "Painter", image: painterImg },
    { id: "gardener", name: "Gardener", image: gardenerImg },
    { id: "carpenter", name: "Carpenter", image: carpenterImg },
  ];

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError("Please select a service category.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await authService.registerProvider({
        username: `${formData.firstName}${formData.lastName}`.toLowerCase(),
        email: formData.email,
        password: formData.password,
        service_category: selectedCategory,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        business_name: formData.businessName || undefined,
        experience_years: formData.experienceYears ? parseInt(formData.experienceYears) : undefined,
        hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
        bio: formData.bio || undefined,
        city: formData.city,
        address: formData.address || undefined,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/provider/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center bg-white dark:bg-black p-3 md:p-0">
        <div className="w-full py-6 md:py-10 relative z-10">
          <div className="max-w-md mx-auto p-4 md:p-6 bg-[#231212] dark:bg-black rounded-4xl shadow border-2 border-[#231212]">
            <div className="text-green-500 text-sm text-center">
              Registration successful! Your application is pending admin approval. You will be
              notified once your profile is approved.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center bg-white dark:bg-black p-3 md:p-0">
      <div className="w-full py-6 md:py-10 relative z-10">
        <div className="max-w-4xl mx-auto p-4 md:p-6 bg-[#231212] dark:bg-black rounded-4xl shadow border-2 border-[#231212]">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white dark:text-white">
            {step === 1 ? "Step 1: Select Your Service Category" : "Step 2: Complete Your Profile"}
          </h2>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          {step === 1 ? (
            <div>
              <p className="text-white dark:text-gray-300 mb-4 text-sm">
                Choose the service category you want to provide:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id
                        ? "border-white bg-[#422727] dark:bg-gray-800"
                        : "border-white hover:bg-[#422727] dark:hover:bg-gray-800"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2"
                      loading="lazy"
                    />
                    <div className="text-white text-sm md:text-base text-center">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleStep1Submit}
                  disabled={!selectedCategory}
                  className="border-2 border-white bg-white hover:text-white dark:bg-[#231212] dark:text-white hover:bg-[#422727] dark:hover:bg-gray-800 text-black p-2 px-4 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                  placeholder="+92 300 1234567"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="Enter a password"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="Repeat your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                  placeholder="ABC Services"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="5"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-xs md:text-sm text-white">
                    Hourly Rate (PKR)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                    placeholder="1000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">Bio/Description</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm min-h-[100px]"
                  placeholder="Tell us about your experience and expertise..."
                />
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                  placeholder="Lahore"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-xs md:text-sm text-white">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="border-2 border-white w-full mb-3 p-2 rounded bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                  placeholder="Street address"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border-2 border-white bg-white text-black dark:bg-[#231212] dark:text-white hover:bg-[#422727] hover:text-white dark:hover:bg-gray-800 p-2 px-4 rounded text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="border-2 border-white bg-white hover:text-white dark:bg-[#231212] dark:text-white hover:bg-[#422727] dark:hover:bg-gray-800 text-black p-2 px-4 rounded text-sm disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 text-xs md:text-sm text-white dark:text-gray-300 text-center">
            Already have an account?{" "}
            <Link to="/provider/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
