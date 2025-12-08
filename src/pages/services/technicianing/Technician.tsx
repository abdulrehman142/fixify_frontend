import technicianImg from "/Fixify_images/technician.png";
import { Link } from "react-router-dom";
import acrepairImg from "/Fixify_images/acrepair.png";
import fridgeImg from "/Fixify_images/fridge.png";
import washingmachineImg from "/Fixify_images/washingmachine.png";
import microwaveImg from "/Fixify_images/microwave.png";
import cctvImg from "/Fixify_images/cctv.png";
import tvImg from "/Fixify_images/tv.png";
const Technician = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Technician Services</h2>
          <p className="mt-2">
            Trained technicians for fast and accurate repair of all major home appliances.
          </p>
        </div>
        <img src={technicianImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/ac-installation-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={acrepairImg}
                alt={"acrepairImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                AC Repair/Installation
              </div>
            </button>
          </Link>

          <Link to="/refrigerator-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={fridgeImg}
                alt={"fridgeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Refrigerator Repair
              </div>
            </button>
          </Link>
          <Link to="/washing-machine-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={washingmachineImg}
                alt={"washingmachineImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Washing Machine Repair
              </div>
            </button>
          </Link>
          <Link to="/microwave-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={microwaveImg}
                alt={"microwaveImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Microwave Repair
              </div>
            </button>
          </Link>
          <Link to="/cctv-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={cctvImg}
                alt={"cctvImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                CCTV Installation
              </div>
            </button>
          </Link>
          <Link to="/tv-repair-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={tvImg}
                alt={"tvImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                TV Repair/Installation
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Technician;
