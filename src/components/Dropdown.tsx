import { Link } from "react-router-dom";

interface DropdownProps {
  darkMode: boolean;
}

// Import all service images
import cleanerImg from "/Fixify_images/cleaner.png";
import electricianImg from "/Fixify_images/electrician.svg";
import plumberImg from "/Fixify_images/plumber.svg";
import mechanicImg from "/Fixify_images/mechanic.png";
import moverImg from "/Fixify_images/mover.png";
import technicianImg from "/Fixify_images/technician.png";
import painterImg from "/Fixify_images/painter.svg";
import gardenerImg from "/Fixify_images/gardener.png";
import carpenterImg from "/Fixify_images/carpenter.svg";

const Dropdown = ({ darkMode }: DropdownProps) => {
  const services = [
    { name: "Cleaner", img: cleanerImg, route: "/cleaner" },
    { name: "Electrician", img: electricianImg, route: "/electrician" },
    { name: "Plumber", img: plumberImg, route: "/plumber" },
    { name: "Mechanic", img: mechanicImg, route: "/mechanic" },
    { name: "Carpenter", img: carpenterImg, route: "/carpenter" },
    { name: "Mover", img: moverImg, route: "/mover" },
    { name: "Technician", img: technicianImg, route: "/technician" },
    { name: "Painter", img: painterImg, route: "/painter" },
    { name: "Gardener", img: gardenerImg, route: "/gardener" },
  ];

  return (
    <div
      className={`flex flex-col shadow-lg rounded-md p-2 border-2 ${
        darkMode ? "bg-black border-[#231212]" : "bg-[#231212] border-[#231212]"
      }`}
    >
      {services.map((service, index) => (
        <Link
          to={service.route}
          key={index}
          className={`border-[#231212] m-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-2 px-3 py-2 w-48 ${
            darkMode
              ? "bg-[#231212] hover:bg-[#422727] text-white hover:text-white"
              : "bg-white hover:bg-[#422727] text-black hover:text-white"
          }`}
        >
          <img
            src={service.img}
            alt={service.name}
            className="w-6 h-6 object-cover rounded flex-shrink-0"
            loading="lazy"
          />
          <div className="font-ibm-plex-mono text-sm truncate">{service.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
