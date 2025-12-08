import gardenerImg from "/Fixify_images/gardener.png";
import pestcleanImg from "/Fixify_images/pest-control.png";
import lawnImg from "/Fixify_images/mowing.png";
import plantingImg from "/Fixify_images/planting.png";
import trimmingImg from "/Fixify_images/trimming.png";
import fertilizerImg from "/Fixify_images/fertilizer.png";
import { Link } from "react-router-dom";
const Gardener = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Gardening Services</h2>
          <p className="mt-2">
            Complete garden care including lawn maintenance, trimming, and plant health improvement.
          </p>
        </div>
        <img src={gardenerImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/lawn-maintenance">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={lawnImg}
                alt={"lawnmaintenance"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Lawn Maintenance
              </div>
            </button>
          </Link>

          <Link to="/planting-replanting">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={plantingImg}
                alt={"plantingreplanting"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Planting/Replanting
              </div>
            </button>
          </Link>
          <Link to="/pest-control-plants">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={pestcleanImg}
                alt={"pestcontrol"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Pest Control
              </div>
            </button>
          </Link>
          <Link to="/hedge-trimming">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={trimmingImg}
                alt={"trimming"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Hedge Trimming
              </div>
            </button>
          </Link>
          <Link to="/fertilizer-treatment">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={fertilizerImg}
                alt={"fertilizer"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Fertilizer Treatment
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gardener;
