// (no local state required; dark mode is handled globally)
import tc from "/Fixify_images/termsCondition.svg";
const TermsAndConditions = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans">
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Terms & Conditions</h2>
          <p className="mt-2">
            All the terms and conditions of Fixify are listed below. Please
            <br /> feel free to contact us in case of any confusion.
          </p>
        </div>
        <img src={tc} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Fixify Terms & Conditions</h1>

        <p className="mb-4">
          Welcome to Fixify! By using our website or app, you agree to the following terms and
          conditions. If you have any questions, please contact us at{" "}
          <a href="mailto:gofixify@gmail.com" className="underline">
            info@fixify.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. About Fixify</h2>
        <p className="mb-4">
          Fixify is an online platform connecting service users (customers) with verified service
          providers (technicians). Please read these terms carefully before using our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Scope of Services</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Fixify helps technicians find work and enables customers to book services easily.</li>
          <li>Technicians are assigned based on availability and skill set.</li>
          <li>Customers may modify or cancel an order if it has not yet been accepted.</li>
          <li>
            Technician details are shared with customers upon assignment via SMS and the Fixify
            platform.
          </li>
          <li>Payments can be made in cash or online (bank transfer, Easypaisa, JazzCash).</li>
          <li>
            Technicians pay Fixify the agreed service charges either from cash received or online
            payments.
          </li>
          <li>
            Both technicians and customers should communicate with Fixify in case of any service
            extension or issue.
          </li>
          <li>Customer reviews are collected for completed services.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Responsibilities of Fixify</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Connecting customers with verified technicians.</li>
          <li>
            Performing legal background checks on technicians, but not responsible for actions at
            service locations.
          </li>
          <li>Fixify may deny account creation or suspend accounts at its discretion.</li>
          <li>
            Fixify does not intervene in disputes between users except to enhance platform
            experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Collection & Privacy</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            We collect user data such as name, phone number, email, and gender when signing up or
            booking a service.
          </li>
          <li>
            Data is used for account creation, bookings, and for service-specific purposes (e.g.,
            female-only services).
          </li>
          <li>
            Users can delete their account via the app or request deletion by contacting{" "}
            <a href="mailto:gofixify@gmail.com" className="underline">
              info@fixify.com
            </a>
            .
          </li>
          <li>Social logins (Google/Facebook) can be unlinked via the app profile settings.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. User Obligations</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Provide accurate information when creating accounts or booking services.</li>
          <li>Abide by all laws and these terms while using the platform.</li>
          <li>Do not use the platform for illegal or unethical purposes.</li>
          <li>
            Technicians must deliver services according to agreed contracts and cannot charge extra
            outside Fixify.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Fees & Payments</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Technicians owe Fixify a service fee, deducted from the agreed price in the account.
          </li>
          <li>Fees are non-refundable and non-cancellable.</li>
          <li>
            Customers pay for services online, while material costs are paid directly to the
            technician or provider.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Guarantees & Refunds</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Guarantee period for home services: 15 days; for cleaning services: 2 days; for on-spot
            services: as specified.
          </li>
          <li>Guarantee does not apply to parts/materials purchased for the service.</li>
          <li>
            Refunds for service charges are transferred to the customer’s digital wallet if
            eligible.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Cancellation & Vendor Arrival</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Customers must notify before vendor arrival to avoid cancellation fees.</li>
          <li>Vendor arrival time includes a 1-hour margin.</li>
          <li>Late cancellation after vendor assignment may result in partial charges.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Delivery & Service Timing</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Technicians arrive at the location within the agreed booking window.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">10. Liability & Limitations</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Fixify is not responsible for property damage or disputes between users beyond
            facilitating the service.
          </li>
          <li>
            Customers are encouraged to be present during service delivery to safeguard their
            property.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
        <p className="mb-4">
          Fixify reserves the right to revise these terms at any time. Users are encouraged to
          review the terms regularly.
        </p>

        <p className="mt-6">
          By using Fixify, you acknowledge that you have read, understood, and agree to these terms
          and conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
