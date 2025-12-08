import carpenterImg from "/Fixify_images/carpenter.svg";
import bedImg from "/Fixify_images/bed.png";
import customfurnitureImg from "/Fixify_images/customfurniture.png";
import lockImg from "/Fixify_images/doorlock.png";
import furnitureImg from "/Fixify_images/furniture.png";
import shelvesImg from "/Fixify_images/shelves.png";
import woodenflooringImg from "/Fixify_images/woodenplate.png";
import { Link } from "react-router-dom";
const Carpenter = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Carpentry Services</h2>
          <p className="mt-2">
            Skilled carpentry work for furniture, doors, cabinets, and custom wood solutions.
          </p>
        </div>
        <img src={carpenterImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/bed-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={bedImg}
                alt={"bedImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Bed Repair/Installation
              </div>
            </button>
          </Link>

          <Link to="/custom-furniture">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={customfurnitureImg}
                alt={"batterytImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Custom Furniture
              </div>
            </button>
          </Link>
          <Link to="/door-lock-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={lockImg}
                alt={"brakeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Door Lock Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/furniture-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={furnitureImg}
                alt={"engineImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Furniture Repair
              </div>
            </button>
          </Link>
          <Link to="/shelves-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={shelvesImg}
                alt={"diagnositicImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Shelves Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/wooden-flooring">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={woodenflooringImg}
                alt={"oilchangeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Wooden Flooring Repair/Installation
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carpenter;
