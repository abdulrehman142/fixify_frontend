import cleanerImg from "/Fixify_images/cleaner.png";
import electricianImg from "/Fixify_images/electrician.svg";
import plumberImg from "/Fixify_images/plumber.svg";
import mechanicImg from "/Fixify_images/mechanic.png";
import moverImg from "/Fixify_images/mover.png";
import technicianImg from "/Fixify_images/technician.png";
import painterImg from "/Fixify_images/painter.svg";
import gardenerImg from "/Fixify_images/gardener.png";
import carpenterImg from "/Fixify_images/carpenter.svg";
import { Link } from "react-router-dom";

interface ServicesProps {
  darkMode?: boolean;
}

const Services = ({ darkMode = false }: ServicesProps) => {
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="p-4 md:p-10 bg-white dark:bg-black min-h-screen font-mono">
        <div className="flex flex-col text-center">
          <div className="font-bold text-3xl md:text-5xl text-[#231212] dark:text-white p-1 m-1">
            Services
          </div>
          <div className="text-sm md:text-md text-[#8e8e93] dark:text-gray-400 p-1 m-1">
            Choose from our wide range of services
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
            <Link to="/cleaner">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={cleanerImg}
                  alt={"cleaner"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Cleaner
                </div>
              </button>
            </Link>
            <Link to="/electrician">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={electricianImg}
                  alt={"electrician"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Electrician
                </div>
              </button>
            </Link>
            <Link to="/plumber">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={plumberImg}
                  alt={"plumber"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Plumber
                </div>
              </button>
            </Link>
            <Link to="/mechanic">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={mechanicImg}
                  alt={"mechanic"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Mechanic
                </div>
              </button>
            </Link>
            <Link to="/mover">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={moverImg}
                  alt={"mover"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Mover
                </div>
              </button>
            </Link>
            <Link to="/technician">
              <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
                <img
                  src={technicianImg}
                  alt={"technician"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Technician
                </div>
              </button>
            </Link>
          </div>
          <div className="flex gap-4 md:gap-20 p-2 m-2 w-full justify-center flex-wrap">
            <Link to="/painter">
              <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
                <img
                  src={painterImg}
                  alt={"painter"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Painter
                </div>
              </button>
            </Link>
            <Link to="/gardener">
              <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
                <img
                  src={gardenerImg}
                  alt={"gardener"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Gardener
                </div>
              </button>
            </Link>
            <Link to="/carpenter">
              <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
                <img
                  src={carpenterImg}
                  alt={"carpenter"}
                  className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                  Carpenter
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
