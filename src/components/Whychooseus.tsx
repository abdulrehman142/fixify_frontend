import whyChooseUsLight from "/Fixify_images/whychooseus.png";
import whyChooseUsDark from "/Fixify_images/dwhychooseus.jpg";
import verifiedIcon from "/Fixify_images/verify.png";
import timeIcon from "/Fixify_images/clock.png";
import customerServiceIcon from "/Fixify_images/customer-service.png";
import costEffectivenessIcon from "/Fixify_images/profits.png";
import qualityAssuranceIcon from "/Fixify_images/quality.png";
import trustIcon from "/Fixify_images/trust.png";
import secureTransactionIcon from "/Fixify_images/guaranteed.png";
interface DropdownProps {
  darkMode: boolean;
}
const Whychooseus = ({ darkMode }: DropdownProps) => {
  return (
    <div>
      <div className="flex dark:bg-black bg-white">
        <img
          src={darkMode ? whyChooseUsDark : whyChooseUsLight}
          alt="whychooseus"
          className="rounded-2xl pl-1 h-150 w-150 p-10 m-10 ml-30 "
          loading="lazy"
        />
        <div className="flex flex-col p-5 m-5">
          <div className="text-[#231212] dark:text-white text-2xl font-bold mb-5">
            Why Choose Us?
          </div>
          <div className="flex items-center">
            <img
              src={verifiedIcon}
              alt="verify"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              Connects you to <strong>Verified and Trained Technicians.</strong>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={timeIcon}
              alt="time"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              <strong>Saves Your Time</strong> through an easy and efficient booking process.
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={customerServiceIcon}
              alt="customersupport"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              Offers <strong>Impeccable Customer Support.</strong>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={costEffectivenessIcon}
              alt="customersupport"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              Ensures <strong>Cost-effectiveness.</strong>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={qualityAssuranceIcon}
              alt="assurance"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              Provides <strong>High-quality, Reliability and Safety.</strong>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src={trustIcon}
              alt="trust"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl dark:text-white">
              Promises <strong>Doorstep Services,</strong> saves travelling costs.
            </div>
          </div>
          <div className="flex items-center dark:text-white">
            <img
              src={secureTransactionIcon}
              alt="guranteed"
              className="ml-0 pl-0 m-2 p-2 h-12 w-12 "
              loading="lazy"
            />
            <div className="pl-0 ml-0 p-2 m-2 text-xl">
              Guarantees <strong>Secure Transactions.</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whychooseus;
