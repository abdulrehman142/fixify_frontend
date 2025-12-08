import React, { useState } from "react";
import { Link } from "react-router-dom";
import discordIconLight from "/Fixify_images/discordicon.png";
import instagramWhite from "/Fixify_images/winstagram.png";
import youtubeWhite from "/Fixify_images/youtubeicon.png";
import discordDark from "/Fixify_images/ddiscord.png";
import instagramDark from "/Fixify_images/dinstagram.png";
import youtubeDark from "/Fixify_images/dyoutube.png";
import sunIcon from "/Fixify_images/sun.png";
import moonIcon from "/Fixify_images/moon.jpg";

interface FooterProps {
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
  className?: string;
}

// ✅ SocialIcon component with hover effect and dark/light mode swap
const SocialIcon: React.FC<SocialIconProps> = ({
  darkMode,
  lightImg,
  lightHover,
  darkImg,
  darkHover,
  alt,
  className,
}) => {
  const [hovered, setHovered] = useState(false);

  const src = darkMode ? (hovered ? darkHover : darkImg) : hovered ? lightHover : lightImg;

  return (
    <div
      className={`p-2 rounded cursor-pointer transition-all duration-300 hover:bg-[#231212] dark:hover:bg-gray-800 hover:scale-110 flex items-center justify-center ${
        className || ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={src} alt={alt} className="w-6 h-6 pointer-events-none" loading="lazy" />
    </div>
  );
};

const Footer = ({ darkMode, setDarkMode }: FooterProps) => {
  const navLinkClass =
    "py-2 xl:px-0 hover:text-white hover:bg-[#231212] dark:hover:bg-gray-800 rounded w-max transition-all duration-200";
  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Footer Top */}
      <div className="w-full bg-[#FFFFFF] dark:bg-black px-5">
        <div className="xl:mx-8 flex flex-col xl:flex-row justify-between items-stretch">
          {/* Navigation Links */}
          <div className="font-ibm-plex-mono dark:text-[#FFFFFF] text-black flex flex-col xl:flex-row font-medium m-2">
            {/* First Column */}
            <div className="flex flex-col p-1 m-0 xl:m-4">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
              <Link to="/services" className={navLinkClass}>
                Services
              </Link>
              <Link to="/how-it-works" className={navLinkClass}>
                How it works
              </Link>
            </div>
            {/* Second Column */}
            <div className="flex flex-col p-1 m-0 xl:m-4">
              <Link to="/contact" className={navLinkClass}>
                Contact Us
              </Link>
              <Link to="/faqs" className={navLinkClass}>
                FAQs
              </Link>
              <Link to="/login" className={navLinkClass}>
                Login
              </Link>
            </div>
            {/* Third Column */}
            <div className="flex flex-col p-1 m-0 xl:m-4">
              <Link to="/about" className={navLinkClass}>
                About Us
              </Link>
            </div>
          </div>

          {/* Right Section: Dark Mode Toggle + Social Icons */}
          <div className="flex flex-col justify-start xl:justify-between items-start xl:items-end mx-0 xl:m-2 gap-y-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-10 h-6 rounded-full flex items-center transition-colors duration-300 m-4 ${
                darkMode ? "bg-black" : "bg-[#F5F5F5]"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full transform transition-transform duration-300 ${
                  darkMode ? "translate-x-[16px] bg-[#484C5B]" : "translate-x-0 bg-gray-200"
                }`}
              ></div>
              <img
                src={darkMode ? sunIcon : moonIcon}
                alt="Mode Icon"
                className={`absolute w-3 h-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "left-1" : "right-1"
                }`}
                loading="lazy"
              />
            </button>

            {/* Social Icons */}
            <div className="m-2 flex flex-col">
              <div className="flex xl:justify-end gap-x-4">
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
                  href="https://discord.com/users/1441059991518842951"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon
                    darkMode={darkMode}
                    lightImg={discordDark}
                    lightHover={discordIconLight}
                    darkImg={discordIconLight}
                    darkHover={discordIconLight}
                    alt="Discord"
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
              </div>

              {/* Footer tagline */}
              <div className="font-ibm-plex-mono dark:text-[#FFFFFF] text-[#000000] text-base leading-[32px] font-normal opacity-50 break-words whitespace-normal m-2 p-0">
                Fix it fast with Fixify.
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer + Footer Links */}
        <div className="mx-0 xl:mx-10 flex flex-col xl:flex-row justify-between items-start gap-y-4">
          <div className="text-[#250843] mx-4 xl:mx-6">
            <p className="text-sm font-ibm-plex-mono dark:text-[#FFFFFF] text-[#250843]">
              © 2025 Fixify All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-row justify-between items-start mx-2 gap-y-4 mb-6 xl:mb-0">
            <Link
              to="/privacy-policy"
              className="hover:underline text-[#98A1B4] text-xs block opacity-50 mx-2 font-ibm-plex-mono dark:text-[#FFFFFF]"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:underline text-[#98A1B4] text-xs block opacity-50 mx-2 font-ibm-plex-mono dark:text-[#FFFFFF]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Hero / Logo Section */}
      <div className="overflow-hidden bg-[#FFFFFF] dark:bg-black">
        <h1 className="tracking-tight font-jersey dark:text-[#FFFFFF] text-[#0F0F0F]  xl:text-[130px] text-[91.03px] text-center xl:leading-[180.24px] leading-[56.9px]">
          Fixify A Service Marketplace
        </h1>
      </div>
    </div>
  );
};

export default Footer;
