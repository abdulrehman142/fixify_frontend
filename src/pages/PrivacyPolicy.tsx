import tc from "/Fixify_images/termsCondition.svg";
const PrivacyPolicy = () => {
  return (
    <div className="dark:text-white dark:bg-black font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="flex justify-between items-center bg-[#231212] dark:bg-black text-white p-6 mb-6 shadow-md">
        <div className="">
          <h2 className="text-5xl font-bold ">Privacy Policy</h2>
          <p className="mt-2">
            By accessing or using the Platform, you agree to this Policy. If you do
            <br /> not agree to this policy, please do not access or use the platform.
          </p>
        </div>
        <img src={tc} alt="Banner" className="h-70 w-70" loading="lazy" />
      </div>
      <div className="p-6 ">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="mb-4">
          Fixify is an on-demand service marketplace connecting customers with skilled professionals
          such as electricians, plumbers, painters, carpenters, and mechanics for all types of
          vehicles. The platform enables users to hire trusted service providers on an hourly basis
          while providing workers with opportunities to showcase their expertise and grow their
          client base. This Privacy Policy explains how Fixify collects, uses, and protects your
          personal information when you use the Fixify app or website.
        </p>

        <p className="mb-4">
          This Privacy Policy explains how <strong>Fixify</strong> collects, uses, discloses, and
          protects your personal information when you use the Fixify mobile application or website
          (“Platform”). By accessing or using the Platform, you agree to the terms of this Privacy
          Policy and the Fixify User Agreement. You must be at least 18 years old to use the
          Platform.
        </p>

        {/* 1. Collection and Use of Personal Information */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          1. Collection and Use of Personal Information
        </h2>

        <h3 className="text-xl font-semibold mt-4 mb-2">a) Information We Collect</h3>
        <p className="mb-4">
          Fixify collects the following information from users who create an account, place a
          booking, or register on the Platform:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Name</li>
          <li>Phone Number</li>
          <li>Email Address</li>
          <li>Gender</li>
        </ul>
        <p className="mb-4">
          Users who only browse the Platform without registering are not required to provide
          personal information.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">b) How We Use Your Information</h3>
        <p className="mb-4">Fixify uses this information to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Create and manage user accounts</li>
          <li>Manage and communicate regarding bookings</li>
          <li>Improve the Platform and provide personalized service recommendations</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2">c) Data Deletion Requests</h3>
        <p className="mb-4">Users may request deletion of their personal data via:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>The in-app Delete Account option</li>
          <li>
            Email:{" "}
            <a href="mailto:gofixify@gmail.com" className="underline">
              info@fixify.com
            </a>
          </li>
          <li>Phone: +92 XXX XXXXXXX</li>
          <li>
            Contact Form:{" "}
            <a href="https://fixify.com/contact-us" className="underline">
              https://fixify.com/contact-us
            </a>
          </li>
        </ul>
        <p className="mb-4">
          When an account is deleted, all related personal information is removed from our systems.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">d) Unlinking Social Logins</h3>
        <p className="mb-4">
          Users who signed in using Google or Facebook can unlink their accounts via the account
          settings. All linked data will be deleted.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">e) Location Data (Fixify Partner App)</h3>
        <p className="mb-4">
          The Fixify Partner App may access your device’s location in the background to:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide nearby job opportunities</li>
          <li>Track arrival accuracy</li>
          <li>Send location-based job notifications</li>
        </ul>

        {/* 2. Cookies and Anonymous Identifiers */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Cookies and Anonymous Identifiers</h2>
        <p className="mb-4">
          The Platform may use cookies or anonymous identifiers to recognize returning users and
          streamline login and booking experiences.
        </p>

        {/* 3. Protecting Personal Information */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Protecting Your Personal Information
        </h2>
        <p className="mb-4">
          Your Fixify account is protected with Two-Factor Authentication (2FA). We take reasonable
          measures to secure your personal data from unauthorized access, use, or disclosure.
        </p>

        {/* 4. Third-Party Sharing */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Third-Party Sharing</h2>
        <p className="mb-4">
          Fixify does not share your personal information with third parties for marketing or
          advertising.
        </p>

        {/* 5. Marketing */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Marketing</h2>
        <p className="mb-4">
          By registering, you may receive service updates, offers, and announcements via email, SMS,
          or push notifications. Users may opt out of marketing messages. Administrative messages
          cannot be opted out of. Fixify uses Google Analytics and remarketing tools; users can opt
          out via Google Ads Settings.
        </p>

        {/* 6. Administrative Communications */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Administrative Communications</h2>
        <p className="mb-4">
          Fixify may send important account-related and administrative notifications, which cannot
          be opted out of. To stop receiving these, users must delete their Fixify account.
        </p>

        {/* 7. Accessing and Updating Personal Information */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          7. Accessing and Updating Personal Information
        </h2>
        <p className="mb-4">
          You may access, edit, or delete your personal information unless retention is required by
          law. Deletion of data may not be immediate due to backups. Requests can be made via{" "}
          <strong>
            <a href="mailto:gofixify@gmail.com" className="underline">
              info@fixify.com
            </a>
          </strong>
          .
        </p>

        {/* 8. Privacy Concerns */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Privacy Concerns</h2>
        <p className="mb-4">
          If you have concerns about how Fixify handles your data, you can contact us via email or
          the contact form. For formal complaints, Fixify will follow up accordingly.
        </p>

        {/* 9. Service Delivery Policy */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">9. Service Delivery Policy</h2>
        <p className="mb-4">
          Fixify service providers aim to arrive at the customer’s location within one hour of the
          scheduled booking, depending on availability.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
