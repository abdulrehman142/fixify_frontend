import plumberImg from "/Fixify_images/plumber.svg";
import gyserImg from "/Fixify_images/boiler.png";
import uncloggingImg from "/Fixify_images/drain.png";
import leakImg from "/Fixify_images/leak.png";
import pipeImg from "/Fixify_images/pipe.png";
import sinkImg from "/Fixify_images/plumber.png";
import toiletrepairImg from "/Fixify_images/toiletrepair.png";
import bathroomImg from "/Fixify_images/public-toilet.png";
import { Link } from "react-router-dom";
const Plumber = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Plumbing Services</h2>
          <p className="mt-2">
            Expert plumbing services for leaks, fittings, drainage, and complete water system care.
          </p>
        </div>
        <img src={plumberImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/bathroom-fittings-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={bathroomImg}
                alt={"pipe"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Bathroom Fittings
              </div>
            </button>
          </Link>

          <Link to="/drain-unclogging">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={uncloggingImg}
                alt={"unclogging"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Drain Unclogging
              </div>
            </button>
          </Link>
          <Link to="/gyser-installation">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={gyserImg}
                alt={"gyser"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Gyser Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/kitchen-sink-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={sinkImg}
                alt={"sink"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Sink Repair/Installation
              </div>
            </button>
          </Link>
          <Link to="/leak-repair">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={leakImg}
                alt={"socket"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Leak Repair
              </div>
            </button>
          </Link>
          <Link to="/pipe-installation">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={pipeImg}
                alt={"pipe"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Pipe Installation
              </div>
            </button>
          </Link>
          <Link to="/toilet-repair-installation">
            <button className="group flex flex-col items-center justify-center p-2 m-2 hover:bg-[#231212] dark:hover:bg-gray-800 rounded transition-colors">
              <img
                src={toiletrepairImg}
                alt={"toiletrepair"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Toilet Repair/Installation
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Plumber;
