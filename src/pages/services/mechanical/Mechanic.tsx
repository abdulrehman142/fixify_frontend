import mechanicImg from "/Fixify_images/mechanic.png";
import { Link } from "react-router-dom";
import acImg from "/Fixify_images/air-conditioning.png";
import batteryImg from "/Fixify_images/battery.png";
import brakeImg from "/Fixify_images/brake.png";
import engineImg from "/Fixify_images/engine.png";
import diagnositicImg from "/Fixify_images/diagnostic.png";
import oilchangeImg from "/Fixify_images/oil-change.png";
import suspensionImg from "/Fixify_images/suspension.png";
import wheelImg from "/Fixify_images/tire.png";
const Mechanic = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Mechanical Services</h2>
          <p className="mt-2">
            Quality mechanical repairs and maintenance to keep your vehicle running smoothly.
          </p>
        </div>
        <img src={mechanicImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/ac-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={acImg}
                alt={"ac"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                AC Repair
              </div>
            </button>
          </Link>

          <Link to="/battery-replacement">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={batteryImg}
                alt={"batterytImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Battery Replacement
              </div>
            </button>
          </Link>
          <Link to="/brake-service">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={brakeImg}
                alt={"brakeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Brake Service
              </div>
            </button>
          </Link>
          <Link to="/car-engine-tune">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={engineImg}
                alt={"engineImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Car Engine Tune
              </div>
            </button>
          </Link>
          <Link to="/diagnostic-scanning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={diagnositicImg}
                alt={"diagnositicImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Diagnostic Scanning
              </div>
            </button>
          </Link>
          <Link to="/oil-change">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={oilchangeImg}
                alt={"oilchangeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Oil Change
              </div>
            </button>
          </Link>
          <Link to="/suspension-repair">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={suspensionImg}
                alt={"suspensionImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Suspension Repair
              </div>
            </button>
          </Link>
          <Link to="/wheel-repair">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={wheelImg}
                alt={"wheelImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Wheel Repair
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mechanic;
