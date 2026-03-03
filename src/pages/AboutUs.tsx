import au from "/Fixify_images/aboutus-bg.png";
import vt from "/Fixify_images/verifiedtech.svg";
import ss from "/Fixify_images/supervisedservice.svg";
import ts from "/Fixify_images/Trustworthyservice.svg";
import as from "/Fixify_images/affordableservices.svg";
const AboutUs = () => {
  return (
    <div className="font-sans leading-relaxed">
      {/* Big Yellow Box */}
      <div className="p-6">
        <img src={au} alt="About Us Banner" className="" loading="lazy" />
      </div>
      <div className="p-6 dark:bg-black dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Who is Fixify?</h1>

        <p className="mb-4 leading-relaxed">
          Fixify is Pakistan’s leading on-demand home and personal services platform, connecting
          customers with skilled, verified technicians in a fast, safe, and hassle-free way. Through
          our modern website, Fixify App, and Fixify Partner App, we make it easier for people to
          book trusted services and for technicians to find stable work opportunities.
        </p>

        <p className="mb-4 leading-relaxed">
          Our mission is simple: <strong>make daily life easier</strong> for customers and empower
          local service providers to grow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Vision & Mission Summary</h2>
        <p className="mb-4 leading-relaxed">
          <strong>Vision:</strong> To become Pakistan’s most trusted and accessible platform for
          home and personal services, where every household can confidently find skilled
          professionals and every technician can build a stable career.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Mission:</strong> We simplify service booking through technology, safety standards,
          and verified experts while creating meaningful earning opportunities for local service
          providers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Detailed Explanation of What We Offer</h2>
        <p className="mb-4 leading-relaxed">
          Fixify offers a complete service ecosystem for homes and individuals. Customers can book
          services across home maintenance, repair, cleaning, moving, and technical support through
          one trusted platform. We manage the full journey from booking to service delivery with
          verified professionals, transparent pricing, customer support, and quality checks. For
          service providers, we offer onboarding, training, digital tools, and a steady stream of
          work opportunities that help them grow their income and professional reputation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Fixify Website & App</h2>
        <p className="mb-4 leading-relaxed">
          Our consumer platform is built to simplify the life of every household. With just a few
          taps, customers can book anything from home repairs to cleaning to personal grooming
          services. Every service comes with:
        </p>

        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>100% quality assurance</li>
          <li>Verified professionals</li>
          <li>Transparent pricing</li>
          <li>Safe and reliable experience</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Fixify Partner App</h2>
        <p className="mb-4 leading-relaxed">
          To uplift and empower technicians, Fixify registers service providers through the Fixify
          Partner App. Each partner completes:
        </p>

        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>Identity and background verification</li>
          <li>Soft skills and behavior training</li>
          <li>Technical skills assessment</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Empowerment Mission</h2>
        <p className="mb-4 leading-relaxed">
          Fixify aims to support thousands of technicians across Pakistan by providing them
          consistent earning opportunities. With guidance from our support team and through strict
          SOPs, technicians deliver an excellent customer experience and earn with dignity and
          reliability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Achievements</h2>
        <p className="mb-4 leading-relaxed">
          Fixify has grown rapidly into a trusted nationwide platform. Our expansion and user
          adoption reflect our commitment to quality.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Service Expansion</h3>
        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>160+ Home Maintenance Services</li>
          <li>30+ Personal Care Services</li>
          <li>Multiple Cleaning & Disinfection Services</li>
          <li>Monthly Home Maintenance Subscription Packages</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Citywide Coverage</h3>
        <p className="mb-4 leading-relaxed">Starting from Lahore, Fixify now operates in:</p>

        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>Lahore</li>
          <li>Karachi</li>
          <li>Islamabad</li>
          <li>Rawalpindi</li>
          <li>Multan</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Growing User Trust</h3>
        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>450,000+ Fixify App users</li>
          <li>9,000+ technicians on Fixify Partner App</li>
          <li>50,000+ monthly website visitors</li>
          <li>100,000+ active recurring customers</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Leadership Team</h2>
        <ul className="list-disc pl-6 mb-4 leading-relaxed">
          <li>CEO - Abdul Rehman</li>
          <li>CTO - Raahim Chaudry</li>
          <li>COO - Rayyan Kamran</li>
          <li>CFO - Fahad Ahmed</li>
        </ul>
      </div>
      <div className="flex justify-between p-6 dark:bg-black bg-white">
        <div className="flex flex-col items-center w-70 h-70 bg-[#f4f4f5] rounded-2xl">
          <div className="mt-4">
            <img src={vt} alt="Verified Tech" className="" loading="lazy" />
          </div>
          <div className="mt-2 font-bold text-2xl">Verified Technicians</div>
          <div className="text-center text-[#94a2b3] p-4">
            Our service providers are verified, monitored, and evaluated for each service provided
            to guarantee our satisfaction.
          </div>
        </div>
        <div className="flex flex-col items-center w-70 h-70 bg-[#f4f4f5] rounded-2xl">
          <div className="mt-4">
            <img src={ss} alt="Supervised service" className="" loading="lazy" />
          </div>
          <div className="mt-2 font-bold text-2xl">Supervised Services</div>
          <div className="text-center text-[#94a2b3] p-4">
            Our customer service is at your disposal seven days a week, and we ensure responsiveness
            from order taking to service delivery.
          </div>
        </div>
        <div className="flex flex-col items-center w-70 h-70 bg-[#f4f4f5] rounded-2xl">
          <div className="mt-4">
            <img src={as} alt="Trustworthy" className="" loading="lazy" />
          </div>
          <div className="mt-2 font-bold text-2xl">Trustworthy Services</div>
          <div className="text-center text-[#94a2b3] p-4">
            Our verified, highly skilled, and experienced technicians will reassure the quality of
            service to win your trust.
          </div>
        </div>
        <div className="flex flex-col items-center w-70 h-70 bg-[#f4f4f5] rounded-2xl">
          <div className="mt-4">
            <img src={ts} alt="Affordable" className="" loading="lazy" />
          </div>
          <div className="mt-2 font-bold text-2xl">Affordable Services</div>
          <div className="text-center text-[#94a2b3] p-4">
            Fixify promises remarkable services at competitive market rates: no hidden charges or
            over-charged bills.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
