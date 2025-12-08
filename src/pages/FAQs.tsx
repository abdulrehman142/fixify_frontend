import { useState } from "react";
import tc from "/Fixify_images/termsCondition.svg";

const FAQs = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: "What is Fixify?",
      answer:
        "Fixify is an on-demand home services platform where you can book trusted professionals for repairs, maintenance, installation, cleaning, and more — all from your phone.",
    },
    {
      id: 2,
      question: "How do I book a service?",
      answer:
        "Simply open the Fixify app, choose the service you need, select a time slot, and confirm your booking. A verified professional will be assigned shortly.",
    },
    {
      id: 3,
      question: "Are the service providers verified?",
      answer:
        "Yes, all Fixify technicians go through background checks, skill verification, and training before joining our platform.",
    },
    {
      id: 4,
      question: "How do I pay for services?",
      answer:
        "You can pay through multiple options including cash, wallet balance, or supported online payment methods (depending on availability in your region).",
    },
    {
      id: 5,
      question: "Can I reschedule or cancel a booking?",
      answer:
        "Yes! You can reschedule or cancel a booking from the 'My Orders' section. Cancellation charges may apply depending on the timing.",
    },
    {
      id: 6,
      question: "What if the technician arrives late?",
      answer:
        "If your technician is delayed, you will be notified through the app. You can also track their status from your order details.",
    },
    {
      id: 7,
      question: "What if I am not satisfied with the service?",
      answer:
        "You can report an issue from the 'Complaints & Feedback' section. We will investigate and offer a resolution as quickly as possible.",
    },
    {
      id: 8,
      question: "How does Fixify ensure safety?",
      answer:
        "All professionals are verified, trained, and follow safety guidelines. We also monitor service quality through user reviews and performance checks.",
    },
    {
      id: 9,
      question: "Which services are available?",
      answer:
        "Fixify offers: Electrician, Plumber, Cleaner, Carpenter, Painter, Mechanic, Technician, Gardener, Mover, and Grocery (Coming Soon)",
    },
  ];

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="dark:text-white dark:bg-black font-mono leading-relaxed">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#231212] dark:bg-black text-white p-4 md:p-6 mb-6 shadow-md gap-4">
        <div className="">
          <h2 className="text-3xl md:text-5xl font-bold ml-0 md:ml-5 md:pl-5 text-center md:text-left">
            FAQs
          </h2>
        </div>
        <img src={tc} alt="Banner" className="h-40 md:h-70 w-40 md:w-70" loading="lazy" />
      </div>

      {/* FAQ Container */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8">
        <div className="space-y-3 md:space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="group border-2 border-gray-300 dark:border-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl  dark:hover:border-gray-500"
            >
              {/* Question - Clickable Header */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between bg-white dark:bg-[#231212] p-3 md:p-4 group-hover:bg-[#422727] dark:group-hover:bg-gray-800  transition-all duration-300 cursor-pointer"
              >
                <span className="text-sm md:text-lg font-semibold text-[#231212] group-hover:text-white dark:text-white transition-all duration-300 text-left">
                  {faq.question}
                </span>
                <span
                  className={`ml-2 md:ml-4 flex-shrink-0 text-[#231212] group-hover:text-white dark:text-white dark:group-hover:text-white transform transition-all duration-500 text-sm md:text-base ${
                    expandedId === faq.id
                      ? "rotate-180 scale-125"
                      : "scale-100 group-hover:scale-110"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Answer - Collapsible Content with Smooth Animation */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-3 md:p-4 border-2 border-gray-300">
                  <p className="text-sm md:text-base text-black dark:text-white">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
