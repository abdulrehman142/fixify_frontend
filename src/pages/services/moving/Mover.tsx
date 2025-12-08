import moverImg from "/Fixify_images/mover.png";
import { Link } from "react-router-dom";
import homeImg from "/Fixify_images/homeshifting.png";
import officeImg from "/Fixify_images/office.png";
import packingImg from "/Fixify_images/packing.png";
import unloadingImg from "/Fixify_images/unloading.png";
import intercityImg from "/Fixify_images/intercity.png";
const Mover = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Moving Services</h2>
          <p className="mt-2">
            Reliable moving services with careful packing, shifting, loading, and unloading.
          </p>
        </div>
        <img src={moverImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/home-shifting">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={homeImg}
                alt={"homeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Home Shifting
              </div>
            </button>
          </Link>

          <Link to="/office-relocation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={officeImg}
                alt={"officeImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Office Relocation
              </div>
            </button>
          </Link>
          <Link to="/packing-unpacking">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={packingImg}
                alt={"packingImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Packing/Unpacking
              </div>
            </button>
          </Link>
          <Link to="/loading-unloading">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={unloadingImg}
                alt={"unloadingImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Loading/Unloading
              </div>
            </button>
          </Link>
          <Link to="/intercity-moving">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={intercityImg}
                alt={"intercityImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Intercity Moving
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mover;
