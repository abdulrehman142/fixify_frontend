import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => {
    return /\S+@\S+\.\S+/.test(e);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);

    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await authService.registerCustomer({ name, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center bg-white dark:bg-black p-3 md:p-0">
      <div className="absolute inset-0" />
      <div className="w-full py-6 md:py-10 relative z-10">
        <div
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.click();
          }}
          className="max-w-md mx-auto p-4 md:p-6 bg-[#231212] dark:bg-black rounded-4xl shadow border-2 border-[#231212] cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white dark:text-white">
            Create an account
          </h2>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          {success ? (
            <div className="text-green-500 text-sm">
              Registration successful. You can now{" "}
              <Link to="/login" className="underline">
                login
              </Link>
              .
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-xs md:text-sm text-white dark:white">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-white w-full mb-3 p-2 rounded border-3xl bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                placeholder="Jane Doe"
                required
              />

              <label className="block mb-2 text-xs md:text-sm text-white dark:text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-white w-full mb-3 p-2 rounded border-3xl bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                placeholder="you@example.com"
                required
              />

              <label className="block mb-2 text-xs md:text-sm text-white dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-white w-full mb-3 p-2 rounded border-3xl bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                placeholder="Enter a password"
                required
              />

              <label className="block mb-2 text-xs md:text-sm text-white dark:black">
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border-2 border-white w-full mb-3 p-2 rounded border-3xl bg-white dark:bg-[#231212] text-black dark:text-white focus:outline-none text-sm"
                placeholder="Repeat your password"
                required
              />
              <div className="items-center justify-center flex">
                <button
                  className="border-2 border-white bg-white dark:bg-[#231212] dark:text-white hover:bg-[#422727] dark:hover:bg-gray-800  hover:text-white text-black p-2 px-4 m-2 rounded text-sm w-full md:w-auto disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-4 text-xs md:text-sm text-white dark:white text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
