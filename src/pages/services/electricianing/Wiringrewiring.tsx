import WireImg from "/Fixify_images/wire.png";
import ratingImg from "/Fixify_images/rating.png";
import yesImg from "/Fixify_images/yes.png";
import noImg from "/Fixify_images/no.png";
import { useNavigate } from "react-router-dom";

const Wiringrewiring = () => {
  const amount = 5000;
  const orders = 2800;
  const rating = 4.7;
  const navigate = useNavigate();
  return (
    <div className="dark:text-white dark:bg-black font-mono">
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 shadow-md">
        <div className="flex gap-y-2">
          <div>
            <h2 className="text-5xl font-bold">Wiring & Rewiring</h2>
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
              navigate("/checkout", { state: { serviceName: "Wiring & Rewiring", amount: amount } })
            }
            className="text-white p-3 m-2 md:m-3 mx-4 md:mx-8 px-6 md:px-8 border-4 rounded-4xl border-white transition-all duration-200 text-sm bg-[#C62828] dark:hover:bg-gray-800 rounded hover:bg-[#422727] w-full md:w-auto"
          >
            Book Now
          </button>
        </div>
        <img src={WireImg} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex p-4">
        <div className="p-4 m-4">
          <div className="font-bold text-3xl p-2 m-2">Includes</div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Existing wiring inspection</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Damaged wire replacement</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Circuit breaker installation</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Grounding and earthing work</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Fixture connection setup</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={yesImg} className="h-8 w-8" />
            <div>Safety testing</div>
          </div>
        </div>
        <div className="p-4 m-4">
          <div className="font-bold text-3xl p-2 m-2">Does not includes</div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Structural wall breaking</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Underground wiring</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Industrial installations</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Solar panel wiring</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Smart home automation</div>
          </div>
          <div className="flex items-center gap-2 p-2 m-2">
            <img src={noImg} className="h-8 w-8" />
            <div>Extensive panel upgrades</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wiringrewiring;
