import tc from "/Fixify_images/termsCondition.svg";
const HowitWorks = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">How it Works</h2>
          <p className="mt-2">
            Fixify is designed to make your life <br />
            easier by connecting you with the <br />
            right services quickly and <br />
            efficiently.
          </p>
        </div>
        <img src={tc} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-100 p-2 m-2 items-center">
          <div className="text-[#5a6872] text-center border-2 dark:text-white rounded-full p-2 m-2 w-12 h-12">
            1
          </div>
          <div className="text-center text-xl font-bold p-1 m-1">Choose a Service</div>
          <div className="text-center text-[#5a6872] dark:text-white p-1 m-1">
            Browse through a wide range of services on Fixify. Whether it’s home repairs, tech
            support, cleaning, or professional consultations, you’ll find exactly what you need.
          </div>
        </div>
        <div className="flex flex-col w-100 p-2 m-2 items-center">
          <div className="text-[#5a6872] text-center border-2 dark:text-white rounded-full p-2 m-2 w-12 h-12">
            2
          </div>
          <div className="text-center text-xl font-bold p-1 m-1">Select a Provider</div>
          <div className="text-center text-[#5a6872] dark:text-white p-1 m-1">
            Each service lists verified providers with ratings, reviews, and availability. Compare
            providers and choose the one that suits your requirements.
          </div>
        </div>
        <div className="flex flex-col w-100 p-2 m-2 items-center">
          <div className="text-[#5a6872] text-center border-2 dark:text-white rounded-full p-2 m-2 w-12 h-12">
            3
          </div>
          <div className="text-center text-xl font-bold p-1 m-1">Schedule Your Appointment</div>
          <div className="text-center text-[#5a6872] dark:text-white p-1 m-1">
            Pick a convenient date and time. Fixify ensures that your selected provider is available
            and confirms your booking instantly.
          </div>
        </div>
        <div className="flex flex-col w-100 p-2 m-2 items-center">
          <div className="text-[#5a6872] text-center border-2 dark:text-white rounded-full p-2 m-2 w-12 h-12">
            4
          </div>
          <div className="text-center text-xl font-bold p-1 m-1">Get the Job Done</div>
          <div className="text-center text-[#5a6872] dark:text-white p-1 m-1">
            On the scheduled day, your chosen provider arrives and completes the service
            efficiently. Fixify ensures quality and reliability every step of the way.
          </div>
        </div>
        <div className="flex flex-col w-100 p-2 m-2 items-center">
          <div className="text-[#5a6872] text-center dark:text-white border-2 rounded-full p-2 m-2 w-12 h-12">
            5
          </div>
          <div className="text-center text-xl font-bold p-1 m-1">Review & Feedback</div>
          <div className="text-center text-[#5a6872] dark:text-white p-1 m-1">
            After the service, leave a rating and feedback. This helps others make informed
            decisions and helps providers improve their services.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
