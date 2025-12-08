import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "/Fixify_images/searchicon.png";
import phoneImg from "/Fixify_images/phone.png";
import teamImg from "/Fixify_images/team.png";
import plumberImg from "/Fixify_images/plumber.webp";
import painterImg from "/Fixify_images/painter.jpg";
import toiletImg from "/Fixify_images/toilet.png";
import houseImg from "/Fixify_images/house.png";
import officeImg from "/Fixify_images/office.png";
import pestControlImg from "/Fixify_images/pest-control.png";
import sofaImg from "/Fixify_images/sofa.png";
import windowImg from "/Fixify_images/window.png";
import kitchenImg from "/Fixify_images/kitchen.png";
import fanImg from "/Fixify_images/fan.png";
import circuitBreakerImg from "/Fixify_images/circuit-breaker.png";
import generatorImg from "/Fixify_images/electric-generator.png";
import socketImg from "/Fixify_images/power-socket.png";
import wireImg from "/Fixify_images/wire.png";
import leakImg from "/Fixify_images/leak.png";
import pipeImg from "/Fixify_images/pipe.png";
import drainImg from "/Fixify_images/drain.png";
import boilerImg from "/Fixify_images/boiler.png";
import toiletrepairImg from "/Fixify_images/toiletrepair.png";
import engineImg from "/Fixify_images/engine.png";
import brakeImg from "/Fixify_images/brake.png";
import oilchangeImg from "/Fixify_images/oil-change.png";
import acrepairImg from "/Fixify_images/acrepair.png";
import batteryImg from "/Fixify_images/battery.png";
import suspensionImg from "/Fixify_images/suspension.png";
import tireImg from "/Fixify_images/tire.png";
import diagnosticImg from "/Fixify_images/diagnostic.png";
import furnitureImg from "/Fixify_images/furniture.png";
import customfurnitureImg from "/Fixify_images/customfurniture.png";
import doorlockImg from "/Fixify_images/doorlock.png";
import woodenImg from "/Fixify_images/wooden.png";
import shelvesImg from "/Fixify_images/shelves.png";
import bedImg from "/Fixify_images/bed.png";
import homeshiftingImg from "/Fixify_images/homeshifting.png";
import packingImg from "/Fixify_images/packing.png";
import unloadingImg from "/Fixify_images/unloading.png";
import intercityImg from "/Fixify_images/intercity.png";
import airconditioningImg from "/Fixify_images/air-conditioning.png";
import fridgeImg from "/Fixify_images/fridge.png";
import washingmachineImg from "/Fixify_images/washingmachine.png";
import microwaveImg from "/Fixify_images/microwave.png";
import cctvImg from "/Fixify_images/cctv.png";
import tvImg from "/Fixify_images/tv.png";
import interiorImg from "/Fixify_images/interior.png";
import exteriorImg from "/Fixify_images/exterior.png";
import doorImg from "/Fixify_images/door.png";
import commercialImg from "/Fixify_images/commercial.png";
import mowingImg from "/Fixify_images/mowing.png";
import plantingImg from "/Fixify_images/planting.png";
import trimmingImg from "/Fixify_images/trimming.png";
import fertilizerImg from "/Fixify_images/fertilizer.png";
import officecleanImg from "/Fixify_images/office-cleaning.png";
import tankImg from "/Fixify_images/cleaning.png";
import lightImg from "/Fixify_images/spotlight.png";
import switchImg from "/Fixify_images/electricity.png";
import bathroomImg from "/Fixify_images/public-toilet.png";
import sinkImg from "/Fixify_images/plumber.png";
import woodenflooringImg from "/Fixify_images/woodenplate.png";
const Hero = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // All subservices with their routes and images
  const allServices = [
    // Cleaning
    { name: "Toilet Cleaning", route: "/toilet-cleaning", image: toiletImg },
    { name: "Home Cleaning", route: "/home-cleaning", image: houseImg },
    { name: "Office Cleaning", route: "/office-cleaning", image: officecleanImg },
    { name: "Pest Cleaning", route: "/pest-cleaning", image: pestControlImg },
    { name: "Sofa Cleaning", route: "/sofa-cleaning", image: sofaImg },
    { name: "Glass Cleaning", route: "/glass-cleaning", image: windowImg },
    { name: "Kitchen Cleaning", route: "/kitchen-cleaning", image: kitchenImg },
    { name: "Water Tank Cleaning", route: "/water-tank-cleaning", image: tankImg },
    // Electrical
    { name: "Fan Repair/Installation", route: "/fan-repair-installation", image: fanImg },
    {
      name: "Breaker Repair/Installation",
      route: "/circuit-breaker-repair-installation",
      image: circuitBreakerImg,
    },
    {
      name: "Generator Repair/Installation",
      route: "/generator-repair-installation",
      image: generatorImg,
    },
    { name: "Socket Repair/Installation", route: "/socket-repair-installation", image: socketImg },
    { name: "Light Repair/Installation", route: "/light-repair-installation", image: lightImg },
    { name: "Wiring Rewiring", route: "/wiring-rewiring", image: wireImg },
    {
      name: "Switchboard Repair/Installation",
      route: "/switchboard-repair-installation",
      image: switchImg,
    },
    // Plumbing
    { name: "Leak Repair", route: "/leak-repair", image: leakImg },
    { name: "Pipe Installation", route: "/pipe-installation", image: pipeImg },
    { name: "Drain Unclogging", route: "/drain-unclogging", image: drainImg },
    { name: "Gyser Repair/Installation", route: "/gyser-installation", image: boilerImg },
    { name: "Bathroom Fittings", route: "/bathroom-fittings-installation", image: bathroomImg },
    { name: "Sink Repair/Installation", route: "/kitchen-sink-repair", image: sinkImg },
    {
      name: "Toilet Repair Installation",
      route: "/toilet-repair-installation",
      image: toiletrepairImg,
    },
    // Mechanical
    { name: "Car Engine Tune", route: "/car-engine-tune", image: engineImg },
    { name: "Brake Service", route: "/brake-service", image: brakeImg },
    { name: "Oil Change", route: "/oil-change", image: oilchangeImg },
    { name: "AC Repair", route: "/ac-repair", image: airconditioningImg },
    { name: "Battery Replacement", route: "/battery-replacement", image: batteryImg },
    { name: "Suspension Repair", route: "/suspension-repair", image: suspensionImg },
    { name: "Wheel Repair", route: "/wheel-repair", image: tireImg },
    { name: "Diagnostic Scanning", route: "/diagnostic-scanning", image: diagnosticImg },
    // Carpentry
    { name: "Furniture Repair", route: "/furniture-repair", image: furnitureImg },
    { name: "Custom Furniture", route: "/custom-furniture", image: customfurnitureImg },
    { name: "Door Lock Repair/Installation", route: "/door-lock-installation", image: doorlockImg },
    {
      name: "Wooden Flooring Repair/Installation",
      route: "/wooden-flooring",
      image: woodenflooringImg,
    },
    { name: "Shelves Repair/Installation", route: "/shelves-installation", image: shelvesImg },
    { name: "Bed Repair/Installation", route: "/bed-repair", image: bedImg },
    // Moving
    { name: "Home Shifting", route: "/home-shifting", image: homeshiftingImg },
    { name: "Office Relocation", route: "/office-relocation", image: officeImg },
    { name: "Packing/Unpacking", route: "/packing-unpacking", image: packingImg },
    { name: "Loading/Unloading", route: "/loading-unloading", image: unloadingImg },
    { name: "Intercity Moving", route: "/intercity-moving", image: intercityImg },
    // Technician
    { name: "AC Repair/Installation", route: "/ac-installation-repair", image: acrepairImg },
    { name: "Refrigerator Repair", route: "/refrigerator-repair", image: fridgeImg },
    { name: "Washing Machine Repair", route: "/washing-machine-repair", image: washingmachineImg },
    { name: "Microwave Repair", route: "/microwave-repair", image: microwaveImg },
    { name: "CCTV Installation", route: "/cctv-installation", image: cctvImg },
    { name: "TV Repair/Installation", route: "/tv-repair-installation", image: tvImg },
    // Painting
    { name: "Interior Painting", route: "/interior-painting", image: interiorImg },
    { name: "Exterior Painting", route: "/exterior-painting", image: exteriorImg },
    { name: "Door Polish", route: "/door-paint", image: doorImg },
    { name: "Wooden Polish", route: "/wooden-paint", image: woodenImg },
    { name: "Commercial Painting", route: "/commercial-painting", image: commercialImg },
    // Gardening
    { name: "Lawn Maintenance", route: "/lawn-maintenance", image: mowingImg },
    { name: "Planting/Replanting", route: "/planting-replanting", image: plantingImg },
    { name: "Hedge Trimming", route: "/hedge-trimming", image: trimmingImg },
    { name: "Pest Control", route: "/pest-control-plants", image: pestControlImg },
    { name: "Fertilizer Treatment", route: "/fertilizer-treatment", image: fertilizerImg },
  ];

  // Filter services based on search
  const filteredServices =
    search.trim() === ""
      ? []
      : allServices.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()));

  // Hero section images carousel
  const heroImages = [teamImg, plumberImg, painterImg];

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle service selection
  const handleSelectService = (route: string) => {
    navigate(route);
    setSearch("");
    setShowSuggestions(false);
  };

  // Function to render your editable box
  const renderEditableBox = (id: string, text: string, setText: (val: string) => void) => {
    const placeholder = "Search for services...";

    return (
      <div className="relative w-full">
        <input
          id={id}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(id);
            setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(null);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder={placeholder}
          className={`font-ibm-plex-mono ml-4 mr-4 mt-2 p-2 m-2 text-base outline-none transition-all duration-200 focus:outline-none rounded-2xl w-full ${
            isFocused === id
              ? "bg-[#422727] text-white dark:bg-gray-800 dark:text-white placeholder:text-white"
              : "bg-white text-black dark:bg-[#231212] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white"
          }`}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredServices.length > 0 && (
          <div
            className={`flex flex-col shadow-lg rounded-md p-2 border-2 absolute top-full left-0 right-0 mt-1 z-50 max-h-64 overflow-y-auto bg-[#231212] dark:bg-black border-[#231212] dark:border-[#231212]`}
          >
            {filteredServices.slice(0, 8).map((service, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectService(service.route)}
                className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#231212] text-black dark:text-white hover:bg-[#422727] hover:text-white`}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-6 h-6 object-cover rounded"
                  loading="lazy"
                />
                <div className="font-ibm-plex-mono text-sm truncate">{service.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Function to send the data (you can replace with API call)
  const handleSend = () => {
    if (search.trim() !== "") {
      const selectedService = allServices.find(
        (s) => s.name.toLowerCase() === search.toLowerCase()
      );
      if (selectedService) {
        navigate(selectedService.route);
      } else if (filteredServices.length > 0) {
        navigate(filteredServices[0].route);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="flex flex-col md:flex-row text-white transition-all duration-500 min-h-screen md:min-h-screen min-h-auto">
        <div className="flex flex-col p-4 md:p-10 flex-1 justify-center md:justify-center">
          {/* Hero Heading */}
          <div className="font-ibm-plex-mono text-[#231212] dark:text-white font-bold text-3xl md:text-5xl py-2 md:py-4">
            Our experts <br />
            will take <br /> it from here
          </div>
          <div className="font-ibm-plex-mono text-black dark:text-white text-base md:text-xl py-2 md:py-4">
            Trusted professionals,
            <br />
            reliable service,every time.
          </div>
          {/* Editable Box + Button */}
          <div className="bg-[#231212] border-4 border-[#231212] dark:bg-black rounded-full py-3 px-4 md:px-6 flex items-center w-fit">
            {renderEditableBox("editableDiv1", search, setSearch)}

            <button
              onClick={handleSend}
              className="p-2 m-2 ml-8 bg-white dark:bg-[#231212] text-white font-ibm-plex-mono rounded-2xl hover:bg-[#422727] dark:hover:bg-gray-800 transition-all duration-200"
            >
              <img src={searchIcon} alt="search" className="h-6 w-6" loading="lazy" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center p-2 m-2 gap-2">
            <button
              onClick={() => navigate("/services")}
              className="text-white p-3 m-2 md:m-3 mx-4 md:mx-8 px-6 md:px-8 border-4 rounded-4xl border-[#231212] transition-all duration-200 text-sm bg-[#231212] dark:hover:bg-gray-800 dark:bg-black rounded hover:bg-[#422727] w-full md:w-auto"
            >
              Book Now
            </button>
            <a
              href="tel:03225455658"
              className="bg-[#231212] p-2 m-2 md:m-2 border-4 rounded-4xl border-[#231212] dark:hover:bg-gray-800 dark:bg-black rounded hover:bg-[#422727] flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <img src={phoneImg} alt="phone" className="w-7 h-7" loading="lazy" />
            </a>
          </div>
        </div>

        {/* Right Side Image Carousel - Full Height and Half Width */}
        <div className="hidden md:flex flex-1 h-screen">
          <div className="relative w-full h-full rounded-l-full overflow-hidden shadow-2xl">
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`hero-${idx}`}
                loading="lazy"
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === imageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Image indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === imageIndex ? "bg-white w-6" : "bg-white opacity-50"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
