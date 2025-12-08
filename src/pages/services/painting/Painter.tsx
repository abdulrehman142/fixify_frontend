import painterImg from "/Fixify_images/painter.svg";
import { Link } from "react-router-dom";
import interiorImg from "/Fixify_images/interior.png";
import exteriorImg from "/Fixify_images/exterior.png";
import doorImg from "/Fixify_images/door.png";
import woodenImg from "/Fixify_images/wooden.png";
import commercialImg from "/Fixify_images/commercial.png";
const Painter = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Painting Services</h2>
          <p className="mt-2">
            Professional painting services with smooth finishing, clean edges, and lasting colors.
          </p>
        </div>
        <img src={painterImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 md:gap-20 p-2 m-2 w-full">
          <Link to="/interior-painting">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={interiorImg}
                alt={"interiorImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Interior Painting
              </div>
            </button>
          </Link>

          <Link to="/exterior-painting">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={exteriorImg}
                alt={"exteriorImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Exterior Painting
              </div>
            </button>
          </Link>
          <Link to="/door-paint">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={doorImg}
                alt={"doorImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Door Polish
              </div>
            </button>
          </Link>
          <Link to="/wooden-paint">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={woodenImg}
                alt={"woodenImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Wooden Polish
              </div>
            </button>
          </Link>
          <Link to="/commercial-painting">
            <button className="group flex flex-col items-center justify-center hover:bg-[#231212] dark:hover:bg-gray-800 p-2 rounded transition-colors">
              <img
                src={commercialImg}
                alt={"commercialImg"}
                className="w-16 md:w-20 h-16 md:h-20 object-cover rounded flex-shrink-0"
                loading="lazy"
              />
              <div className="text-center text-base md:text-xl text-[#231212] group-hover:text-white dark:text-white">
                Commercial Painting
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Painter;
