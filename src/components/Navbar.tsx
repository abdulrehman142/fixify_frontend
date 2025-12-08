import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import fixifyLogo from "/Fixify_images/fixifylogo.png";
import dropdownArrowLight from "/Fixify_images/dropdown.png";

// 🟢 Light mode social icons
import instagramWhite from "/Fixify_images/winstagram.png";
import youtubeWhite from "/Fixify_images/youtubeicon.png";
import discordWhite from "/Fixify_images/discordicon.png";
import darkModeIconWhite from "/Fixify_images/wdarkmodeicon.jpg";

// ⚫ Dark mode social icons
import instagramDark from "/Fixify_images/dinstagram.png";
import youtubeDark from "/Fixify_images/dyoutube.png";
import discordDark from "/Fixify_images/ddiscord.png";
import darkModeIconDark from "/Fixify_images/ddarkmodeicon.png";
import dropdownArrowDark from "/Fixify_images/ddropdown.png";
// 🌙 Moon icon for hover state
import moonHoverIcon from "/Fixify_images/wmoon.png";

import "../index.css";
import Dropdown from "../components/Dropdown";
import registerIcon from "/Fixify_images/register.png";
import loginIcon from "/Fixify_images/login.png";
import logoutImg from "/Fixify_images/logout.png";
import dashboardImg from "/Fixify_images/dashboard.png";

import adminImg from "/Fixify_images/admin.png";
import customerImg from "/Fixify_images/customer.png";
import providerImg from "/Fixify_images/serviceprovider.png";
import serviceproviderImg from "/Fixify_images/serviceprovider.png";
interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SocialIconProps {
  darkMode: boolean;
  lightImg: string;
  lightHover: string;
  darkImg: string;
  darkHover: string;
  alt: string;
  onClick?: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  darkMode,
  lightImg,
  lightHover,
  darkImg,
  darkHover,
  alt,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const src = darkMode ? (hovered ? darkHover : darkImg) : hovered ? lightHover : lightImg;

  return (
    <div
      className="p-2 rounded cursor-pointer transition-all duration-300 hover:bg-[#231212] dark:hover:bg-gray-800 hover:scale-110 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="w-5 h-5 pointer-events-none" loading="lazy" />
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegisterDropdownOpen, setIsRegisterDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const registerDropdownRef = useRef<HTMLDivElement>(null);
  const loginDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (
        registerDropdownRef.current &&
        !registerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRegisterDropdownOpen(false);
      }
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setIsLoginDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex dark:bg-black bg-white items-center justify-between pl-2 md:pl-4 flex-wrap md:flex-nowrap">
        {/* 🟢 Left: Logo + Brand */}
        <div className="flex">
          <div className="flex items-center p-2">
            <img src={fixifyLogo} alt="Fixify Logo" className="h-6 w-6" loading="lazy" />
            <div className="font-jersey dark:text-white text-black text-xl md:text-2xl ml-1">
              Fixify
            </div>
          </div>

          {/* 🟣 Middle: Nav Links - Hidden on mobile */}
          <div className="hidden lg:flex p-6 relative">
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "How it works", href: "/how-it-works" },
              { name: "About Us", href: "/about" },
              { name: "Contact Us", href: "/contact" },
              { name: "FAQs", href: "/faqs" },
              ...(isAuthenticated && user?.role === "customer"
                ? [
                    { name: "My Orders", href: "/customer/orders" },
                    { name: "My Profile", href: "/customer/profile" },
                  ]
                : []),
            ].map((item, index) => (
              <div
                key={index}
                className="relative"
                ref={item.name === "Services" ? dropdownRef : null}
              >
                {item.name === "Services" ? (
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="group flex items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 rounded p-2 m-2 font-ibm-plex-mono font-medium text-sm dark:text-white text-black transition-all duration-200 whitespace-nowrap cursor-pointer"
                  >
                    <span className="flex items-center group-hover:text-white">
                      {item.name}
                      <img
                        src={darkMode ? dropdownArrowLight : dropdownArrowDark}
                        alt="Dropdown"
                        className={`h-3 w-3 ml-1 mt-0.5 group-hover:brightness-0 group-hover:invert transition-all duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        loading="lazy"
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="group flex items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 rounded p-2 m-2 font-ibm-plex-mono font-medium text-sm dark:text-white text-black transition-all duration-200 whitespace-nowrap"
                  >
                    <span className="flex items-center group-hover:text-white">{item.name}</span>
                  </Link>
                )}
                {/* Dropdown positioned below Services link - shows on click */}
                {item.name === "Services" && isDropdownOpen && (
                  <div className="absolute top-full left-0 z-50 mt-1">
                    <Dropdown darkMode={darkMode} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 🔵 Right: Social Icons + Dark Mode Toggle */}
          <div className="hidden md:flex justify-between p-4 m-4">
            {/* Social Icons */}
            <div className="flex">
              <a
                href="https://www.instagram.com/gofixify/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  darkMode={darkMode}
                  lightImg={instagramDark}
                  lightHover={instagramWhite}
                  darkImg={instagramWhite}
                  darkHover={instagramWhite}
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.youtube.com/@FixifySupport"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  darkMode={darkMode}
                  lightImg={youtubeDark}
                  lightHover={youtubeWhite}
                  darkImg={youtubeWhite}
                  darkHover={youtubeWhite}
                  alt="YouTube"
                />
              </a>
              <a
                href="https://discord.com/users/1441059991518842951"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon
                  darkMode={darkMode}
                  lightImg={discordDark}
                  lightHover={discordWhite}
                  darkImg={discordWhite}
                  darkHover={discordWhite}
                  alt="Discord"
                />
              </a>
              {/* Dark Mode Toggle */}
              <SocialIcon
                darkMode={darkMode}
                lightImg={darkModeIconDark}
                lightHover={moonHoverIcon}
                darkImg={darkModeIconWhite}
                darkHover={darkModeIconWhite}
                alt="Toggle Dark Mode"
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        </div>
        {/* Buttons - Stack on mobile */}
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 m-2 md:m-6 w-full md:w-auto">
          {isAuthenticated ? (
            <>
              {/* Authenticated User Actions */}
              {user?.role === "customer" && (
                <>
                  <div
                    onClick={() => navigate("/provider/register")}
                    className="flex items-center bg-[#231212] hover:bg-[#422727] dark:hover:bg-gray-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start"
                  >
                    <button className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 hover:opacity-90 transition-all whitespace-nowrap">
                      Apply as Provider
                    </button>
                  </div>
                </>
              )}
              {user?.role === "service_provider" && (
                <div
                  onClick={() => navigate("/provider/dashboard")}
                  className="flex items-center bg-[#231212] hover:bg-[#422727] dark:hover:bg-gray-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start"
                >
                  <img
                    src={dashboardImg}
                    alt="dashboard"
                    className="pl-1 h-5 w-6 pointer-events-none"
                    loading="lazy"
                  />
                  <button className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 hover:opacity-90 transition-all whitespace-nowrap">
                    Dashboard
                  </button>
                </div>
              )}
              {user?.role === "admin" && (
                <div
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center bg-[#231212] hover:bg-[#422727] dark:hover:bg-gray-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start"
                >
                  <img
                    src={dashboardImg}
                    alt="dashboard"
                    className="pl-1 h-5 w-6 pointer-events-none"
                    loading="lazy"
                  />
                  <button className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 hover:opacity-90 transition-all whitespace-nowrap">
                    Admin Dashboard
                  </button>
                </div>
              )}
              <div
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex items-center bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start"
              >
                <img
                  src={logoutImg}
                  alt="logout"
                  className="pl-1 h-5 w-6 pointer-events-none"
                  loading="lazy"
                />
                <button className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 hover:opacity-90 transition-all whitespace-nowrap">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated User Actions */}
              {/* Register Dropdown */}
              <div className="relative" ref={registerDropdownRef}>
                <button
                  onClick={() => setIsRegisterDropdownOpen(!isRegisterDropdownOpen)}
                  className="flex items-center bg-[#231212] hover:bg-[#422727] dark:hover:bg-gray-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start px-2 pr-0 py-1"
                >
                  <img
                    src={registerIcon}
                    alt="register"
                    className="pl-1 h-5 w-6 pointer-events-none"
                    loading="lazy"
                  />
                  <span className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 pr-0 hover:opacity-90 transition-all pointer-events-none whitespace-nowrap">
                    Register
                  </span>
                  <img
                    src={dropdownArrowLight}
                    alt="dropdown"
                    className={`h-3 w-3 ml-2 mr-3 transition-all duration-200 ${
                      isRegisterDropdownOpen ? "rotate-180" : ""
                    }`}
                    loading="lazy"
                  />
                </button>

                {/* Register Dropdown Menu */}
                {isRegisterDropdownOpen && (
                  <div
                    className={`absolute right-0 top-full z-50 mt-1 rounded-md border-2 shadow-lg flex flex-col p-2 ${
                      darkMode ? "bg-black border-[#231212]" : "bg-[#231212] border-[#231212]"
                    }`}
                  >
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsRegisterDropdownOpen(false);
                      }}
                      className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-50 ${
                        darkMode
                          ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
                          : "bg-white hover:bg-[#422727] text-black hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={customerImg}
                          alt="customer"
                          className="pl-1 h-5 w-6 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="font-ibm-plex-mono text-sm">Customer Register</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/provider/register");
                        setIsRegisterDropdownOpen(false);
                      }}
                      className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-50 ${
                        darkMode
                          ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
                          : "bg-white hover:bg-[#422727] text-black hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={providerImg}
                          alt="provider"
                          className="pl-1 h-5 w-6 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="font-ibm-plex-mono text-sm">Provider Register</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Login Dropdown */}
              <div className="relative" ref={loginDropdownRef}>
                <button
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  className="flex items-center bg-[#231212] hover:bg-[#422727] dark:hover:bg-gray-800 rounded cursor-pointer transition-all duration-300 w-full md:w-auto justify-center md:justify-start px-2 pr-0 py-1"
                >
                  <img
                    src={loginIcon}
                    alt="login"
                    className="pl-1 h-5 w-6 pointer-events-none"
                    loading="lazy"
                  />
                  <span className="font-ibm-plex-mono text-center text-white text-xs md:text-sm p-2 pr-0 hover:opacity-90 transition-all pointer-events-none whitespace-nowrap">
                    Login
                  </span>
                  <img
                    src={dropdownArrowLight}
                    alt="dropdown"
                    className={`h-3 w-3 ml-2 mr-3 transition-all duration-200 ${
                      isLoginDropdownOpen ? "rotate-180" : ""
                    }`}
                    loading="lazy"
                  />
                </button>

                {/* Login Dropdown Menu */}
                {isLoginDropdownOpen && (
                  <div
                    className={`absolute right-0 top-full z-50 mt-1 rounded-md border-2 shadow-lg flex flex-col p-2 ${
                      darkMode ? "bg-black border-[#231212]" : "bg-[#231212] border-[#231212]"
                    }`}
                  >
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsLoginDropdownOpen(false);
                      }}
                      className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-48 ${
                        darkMode
                          ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
                          : "bg-white hover:bg-[#422727] text-black hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={customerImg}
                          alt="customer"
                          className="pl-1 h-5 w-6 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="font-ibm-plex-mono text-sm truncate">Customer Login</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/provider/login");
                        setIsLoginDropdownOpen(false);
                      }}
                      className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-48 ${
                        darkMode
                          ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
                          : "bg-white hover:bg-[#422727] text-black hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={serviceproviderImg}
                          alt="serviceprovider"
                          className="pl-1 h-5 w-6 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="font-ibm-plex-mono text-sm truncate">Provider Login</div>
                      </div>
                    </button>
                    <div
                      className={`border-t-2 m-1 ${
                        darkMode ? "border-[#422727]" : "border-[#422727]"
                      }`}
                    ></div>
                    <button
                      onClick={() => {
                        navigate("/admin/login");
                        setIsLoginDropdownOpen(false);
                      }}
                      className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-48 ${
                        darkMode
                          ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
                          : "bg-white hover:bg-[#422727] text-black hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={adminImg}
                          alt="admin"
                          className="pl-1 h-5 w-6 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="font-ibm-plex-mono text-sm truncate">Admin Login</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
