import BatteryImg from "/Fixify_images/battery.png";
import ratingImg from "/Fixify_images/rating.png";
import yesImg from "/Fixify_images/yes.png";
import noImg from "/Fixify_images/no.png";
import { useNavigate } from "react-router-dom";

const Batteryreplacement = () => {
  const amount = 3500;
  const orders = 3800;
  const rating = 4.7;
  const navigate = useNavigate();
  return (
    <div className="dark:text-white dark:bg-black font-mono">
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 shadow-md">
        <div className="flex gap-y-2">
          <div>
            <h2 className="text-5xl font-bold">Battery Replacement</h2>
            <div className="text-3xl font-bold mt-2">{`RS ${amount}`}</div>
            <div className="flex items-center mt-2 gap-2 text-xl">
              <img src={yesImg} alt="Banner" className="h-8 w-8" loading="lazy" />
              {`${orders}+ Orders Completed`}
            </div>
            <div className="flex items-center mt-2 gap-2 text-xl">
              <img src={ratingImg} alt="Banner" className="h-8 w-8" loading="lazy" />
              {`${rating} Rating`}
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              navigate("/checkout", {
                state: { serviceName: "Battery Replacement", amount: amount },
              })
            }
            className="text-white p-3 m-2 md:m-3 mx-4 md:mx-8 px-6 md:px-8 border-4 rounded-4xl border-white transition-all duration-200 text-sm bg-[#C62828] dark:hover:bg-gray-800 rounded hover:bg-[#422727] w-full md:w-auto"
          >
            Book Now
          </button>
        </div>
        <img src={BatteryImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex p-4">
        <div className="p-4 m-4">
          <div className="font-bold text-3xl p-2 m-2">Includes</div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Battery inspection and testing</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Old battery removal</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>New battery installation</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Terminal cleaning</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Charging system check</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Performance verification</div>
          </div>
        </div>
        <div className="p-4 m-4">
          <div className="font-bold text-3xl p-2 m-2">Does not includes</div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Alternator repair</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Electrical system overhaul</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Custom batteries</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Battery disposal</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Warranty extension</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Performance upgrades</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Batteryreplacement;
