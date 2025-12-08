import electricianImg from "/Fixify_images/electrician.svg";
import circuitImg from "/Fixify_images/circuit-breaker.png";
import generatorImg from "/Fixify_images/electric-generator.png";
import switchImg from "/Fixify_images/electricity.png";
import fanImg from "/Fixify_images/fan.png";
import socketImg from "/Fixify_images/power-socket.png";
import lightImg from "/Fixify_images/spotlight.png";
import wireImg from "/Fixify_images/wire.png";
import { Link } from "react-router-dom";
const Electrician = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Electric Services</h2>
          <p className="mt-2">
            Certified electricians providing safe and reliable electrical installations and repairs.
          </p>
        </div>
        <img src={electricianImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/circuit-breaker-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={circuitImg}
                alt={"circuitbreaker"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Breaker Repair/Installation
              </div>
            </button>
          </Link>

          <Link to="/fan-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={fanImg}
                alt={"fan"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Fan Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/generator-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={generatorImg}
                alt={"generator"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Generator Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/light-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={lightImg}
                alt={"light"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Light Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/socket-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={socketImg}
                alt={"socket"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Socket Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/switchboard-repair-installation">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={switchImg}
                alt={"switch"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Switchboard Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/wiring-rewiring">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={wireImg}
                alt={"kitchen"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Wiring/Rewiring
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Electrician;
