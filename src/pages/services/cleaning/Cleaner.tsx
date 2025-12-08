import cleanerImg from "/Fixify_images/cleaner.png";
import homecleanImg from "/Fixify_images/house.png";
import officecleanImg from "/Fixify_images/office-cleaning.png";
import pestcleanImg from "/Fixify_images/pest-control.png";
import sofacleanImg from "/Fixify_images/sofa.png";
import toiletcleanImg from "/Fixify_images/toilet.png";
import glasscleanImg from "/Fixify_images/window.png";
import kitchencleanImg from "/Fixify_images/kitchen.png";
import tankImg from "/Fixify_images/cleaning.png";
import { Link } from "react-router-dom";

const Cleaner = () => {
  return (
    <div className="dark:text-white dark:bg-black font-mono">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold">Cleaning Services</h2>
          <p className="mt-2">
            Professional cleaning to keep your home or office spotless, fresh, and hygienic.
          </p>
        </div>
        <img src={cleanerImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/home-cleaning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={homecleanImg}
                alt={"homecleaning"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Home Cleaning
              </div>
            </button>
          </Link>

          <Link to="/office-cleaning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={officecleanImg}
                alt={"officecleaning"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Office Cleaning
              </div>
            </button>
          </Link>
          <Link to="/pest-cleaning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={pestcleanImg}
                alt={"pestcontrol"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Pest Cleaning
              </div>
            </button>
          </Link>
          <Link to="/sofa-cleaning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={sofacleanImg}
                alt={"sofa"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Sofa Cleaning
              </div>
            </button>
          </Link>
          <Link to="/toilet-cleaning">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={toiletcleanImg}
                alt={"toilet"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Toilet Cleaning
              </div>
            </button>
          </Link>
          <Link to="/glass-cleaning">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={glasscleanImg}
                alt={"glass"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Glass Cleaning
              </div>
            </button>
          </Link>
          <Link to="/kitchen-cleaning">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={kitchencleanImg}
                alt={"kitchen"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Kitchen Cleaning
              </div>
            </button>
          </Link>
          <Link to="/water-tank-cleaning">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={tankImg}
                alt={"tank"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Water Tank Cleaning
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cleaner;
