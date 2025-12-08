import "./index.css";
import { useState, Suspense, lazy, useEffect, type Dispatch, type SetStateAction } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { setNavigate } from "./services/api";

// Lazy load non-critical routes for faster initial page load
const Services = lazy(() => import("./pages/services/Services"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const HowitWorks = lazy(() => import("./pages/HowitWorks"));
const FAQs = lazy(() => import("./pages/FAQs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/Terms&Conditions"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Cleaner = lazy(() => import("./pages/services/cleaning/Cleaner"));
const Carpenter = lazy(() => import("./pages/services/carpenter/Carpenter"));
const Furniturerepair = lazy(() => import("./pages/services/carpenter/Furniturerepair"));
const Customfurniture = lazy(() => import("./pages/services/carpenter/Customfurniture"));
const Doorlockinstallation = lazy(() => import("./pages/services/carpenter/Doorlockinstallation"));
const Woodenflooring = lazy(() => import("./pages/services/carpenter/Woodenflooring"));
const Shelvesinstallation = lazy(() => import("./pages/services/carpenter/Shelvesinstallation"));
const Bedrepair = lazy(() => import("./pages/services/carpenter/Bedrepair"));
const Electrician = lazy(() => import("./pages/services/electricianing/Electrician"));
const Fanrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Fanrepairinstallation")
);
const Circuitbreakerrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Circuitbreakerrepairinstallation")
);
const Generatorrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Generatorrepairinstallation")
);
const Socketrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Socketrepairinstallation")
);
const Lightrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Lightrepairinstallation")
);
const Wiringrewiring = lazy(() => import("./pages/services/electricianing/Wiringrewiring"));
const Switchboardrepairinstallation = lazy(
  () => import("./pages/services/electricianing/Switchboardrepairinstallation")
);
const Gardener = lazy(() => import("./pages/services/gardening/Gardener"));
const Lawnmaintenance = lazy(() => import("./pages/services/gardening/Lawnmaintenance"));
const Plantingreplanting = lazy(() => import("./pages/services/gardening/Plantingreplanting"));
const Trimming = lazy(() => import("./pages/services/gardening/Trimming"));
const Pestcontrolforplants = lazy(() => import("./pages/services/gardening/Pestcontrolforplants"));
const Fertilizertreatment = lazy(() => import("./pages/services/gardening/Fertilizertreatment"));
const Mechanic = lazy(() => import("./pages/services/mechanical/Mechanic"));
const Carenginetune = lazy(() => import("./pages/services/mechanical/Carenginetune"));
const Brakeservice = lazy(() => import("./pages/services/mechanical/Brakeservice"));
const Oilchange = lazy(() => import("./pages/services/mechanical/Oilchange"));
const Acrepair = lazy(() => import("./pages/services/mechanical/Acrepair"));
const Batteryreplacement = lazy(() => import("./pages/services/mechanical/Batteryreplacement"));
const Suspensionrepair = lazy(() => import("./pages/services/mechanical/Suspensionrepair"));
const Wheelrepair = lazy(() => import("./pages/services/mechanical/Wheelrepair"));
const Diagnosticscanning = lazy(() => import("./pages/services/mechanical/Diagnosticscanning"));
const Mover = lazy(() => import("./pages/services/moving/Mover"));
const Homeshifting = lazy(() => import("./pages/services/moving/Homeshifting"));
const Officerelocation = lazy(() => import("./pages/services/moving/Officerelocation"));
const Packingandunpacking = lazy(() => import("./pages/services/moving/Packingandunpacking"));
const Loadingunloading = lazy(() => import("./pages/services/moving/Loadingunloading"));
const Intercitymoving = lazy(() => import("./pages/services/moving/Intercitymoving"));
const Painter = lazy(() => import("./pages/services/painting/Painter"));
const Interiorpainting = lazy(() => import("./pages/services/painting/Interiorpainting"));
const Exteriorpainting = lazy(() => import("./pages/services/painting/Exteriorpainting"));
const Doorpaint = lazy(() => import("./pages/services/painting/Doorpaint"));
const Woodenpaint = lazy(() => import("./pages/services/painting/Woodenpaint"));
const Commercialpainting = lazy(() => import("./pages/services/painting/Commercialpainting"));
const Plumber = lazy(() => import("./pages/services/plumbing/Plumber"));
const Leakrepair = lazy(() => import("./pages/services/plumbing/Leakrepair"));
const Pipeinstallation = lazy(() => import("./pages/services/plumbing/Pipeinstallation"));
const Drainunclogging = lazy(() => import("./pages/services/plumbing/Drainunclogging"));
const Watertankcleaning = lazy(() => import("./pages/services/cleaning/Watertankcleaning"));
const Gyserinstallation = lazy(() => import("./pages/services/plumbing/Gyserinstallation"));
const Bathroomfittingsinstallation = lazy(
  () => import("./pages/services/plumbing/Bathroomfittingsinstallation")
);
const Sinkrepair = lazy(() => import("./pages/services/plumbing/Sinkrepair"));
const Toiletrepairinstallation = lazy(
  () => import("./pages/services/plumbing/Toiletrepairinstallation")
);
const Technician = lazy(() => import("./pages/services/technicianing/Technician"));
const Acinstallationrepair = lazy(
  () => import("./pages/services/technicianing/Acinstallationrepair")
);
const Refrigeratorrepair = lazy(() => import("./pages/services/technicianing/Refrigeratorrepair"));
const Washingmachinerepair = lazy(
  () => import("./pages/services/technicianing/Washingmachinerepair")
);
const Microwaverepair = lazy(() => import("./pages/services/technicianing/Microwaverepair"));
const Cctvinstallation = lazy(() => import("./pages/services/technicianing/Cctvinstallation"));
const Tvrepairinstallation = lazy(
  () => import("./pages/services/technicianing/Tvrepairinstallation")
);
const Toiletcleaning = lazy(() => import("./pages/services/cleaning/Toiletcleaning"));
const Homecleaning = lazy(() => import("./pages/services/cleaning/Homecleaning"));
const Officecleaning = lazy(() => import("./pages/services/cleaning/Officecleaning"));
const Pestcleaning = lazy(() => import("./pages/services/cleaning/Pestcleaning"));
const Sofacleaning = lazy(() => import("./pages/services/cleaning/Sofacleaning"));
const Glasscleaning = lazy(() => import("./pages/services/cleaning/Glasscleaning"));
const Kitchencleaning = lazy(() => import("./pages/services/cleaning/Kitchencleaning"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CustomerOrders = lazy(() => import("./pages/CustomerOrders"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));
// Service Provider routes
const RegisterProvider = lazy(() => import("./pages/service-provider/RegisterProvider"));
const LoginProvider = lazy(() => import("./pages/service-provider/LoginProvider"));
const ProviderDashboard = lazy(() => import("./pages/service-provider/ProviderDashboard"));
// Admin routes
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
// Loading fallback component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#231212] dark:border-white"></div>
      <p className="mt-4 text-[#231212] dark:text-white">Loading...</p>
    </div>
  </div>
);

// Component to set up navigation for axios interceptor
const AppRouter = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate((path: string) => navigate(path));
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/services" element={<Services darkMode={darkMode} />} />
            <Route path="/how-it-works" element={<HowitWorks />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cleaner" element={<Cleaner />} />
            <Route path="/carpenter" element={<Carpenter />} />
            <Route path="/electrician" element={<Electrician />} />
            <Route path="/gardener" element={<Gardener />} />
            <Route path="/mechanic" element={<Mechanic />} />
            <Route path="/mover" element={<Mover />} />
            <Route path="/painter" element={<Painter />} />
            <Route path="/plumber" element={<Plumber />} />
            <Route path="/technician" element={<Technician />} />
            <Route path="/toilet-cleaning" element={<Toiletcleaning />} />
            <Route path="/home-cleaning" element={<Homecleaning />} />
            <Route path="/office-cleaning" element={<Officecleaning />} />
            <Route path="/pest-cleaning" element={<Pestcleaning />} />
            <Route path="/sofa-cleaning" element={<Sofacleaning />} />
            <Route path="/glass-cleaning" element={<Glasscleaning />} />
            <Route path="/kitchen-cleaning" element={<Kitchencleaning />} />
            <Route path="/fan-repair-installation" element={<Fanrepairinstallation />} />
            <Route
              path="/circuit-breaker-repair-installation"
              element={<Circuitbreakerrepairinstallation />}
            />
            <Route
              path="/generator-repair-installation"
              element={<Generatorrepairinstallation />}
            />
            <Route path="/socket-repair-installation" element={<Socketrepairinstallation />} />
            <Route path="/light-repair-installation" element={<Lightrepairinstallation />} />
            <Route path="/wiring-rewiring" element={<Wiringrewiring />} />
            <Route
              path="/switchboard-repair-installation"
              element={<Switchboardrepairinstallation />}
            />
            <Route path="/leak-repair" element={<Leakrepair />} />
            <Route path="/pipe-installation" element={<Pipeinstallation />} />
            <Route path="/drain-unclogging" element={<Drainunclogging />} />
            <Route path="/water-tank-cleaning" element={<Watertankcleaning />} />
            <Route path="/gyser-installation" element={<Gyserinstallation />} />
            <Route
              path="/bathroom-fittings-installation"
              element={<Bathroomfittingsinstallation />}
            />
            <Route path="/kitchen-sink-repair" element={<Sinkrepair />} />
            <Route path="/toilet-repair-installation" element={<Toiletrepairinstallation />} />
            <Route path="/car-engine-tune" element={<Carenginetune />} />
            <Route path="/brake-service" element={<Brakeservice />} />
            <Route path="/oil-change" element={<Oilchange />} />
            <Route path="/ac-repair" element={<Acrepair />} />
            <Route path="/battery-replacement" element={<Batteryreplacement />} />
            <Route path="/suspension-repair" element={<Suspensionrepair />} />
            <Route path="/wheel-repair" element={<Wheelrepair />} />
            <Route path="/diagnostic-scanning" element={<Diagnosticscanning />} />
            <Route path="/furniture-repair" element={<Furniturerepair />} />
            <Route path="/custom-furniture" element={<Customfurniture />} />
            <Route path="/door-lock-installation" element={<Doorlockinstallation />} />
            <Route path="/wooden-flooring" element={<Woodenflooring />} />
            <Route path="/shelves-installation" element={<Shelvesinstallation />} />
            <Route path="/bed-repair" element={<Bedrepair />} />
            <Route path="/home-shifting" element={<Homeshifting />} />
            <Route path="/office-relocation" element={<Officerelocation />} />
            <Route path="/packing-unpacking" element={<Packingandunpacking />} />
            <Route path="/loading-unloading" element={<Loadingunloading />} />
            <Route path="/intercity-moving" element={<Intercitymoving />} />
            <Route path="/ac-installation-repair" element={<Acinstallationrepair />} />
            <Route path="/refrigerator-repair" element={<Refrigeratorrepair />} />
            <Route path="/washing-machine-repair" element={<Washingmachinerepair />} />
            <Route path="/microwave-repair" element={<Microwaverepair />} />
            <Route path="/cctv-installation" element={<Cctvinstallation />} />
            <Route path="/tv-repair-installation" element={<Tvrepairinstallation />} />
            <Route path="/interior-painting" element={<Interiorpainting />} />
            <Route path="/exterior-painting" element={<Exteriorpainting />} />
            <Route path="/door-paint" element={<Doorpaint />} />
            <Route path="/wooden-paint" element={<Woodenpaint />} />
            <Route path="/commercial-painting" element={<Commercialpainting />} />
            <Route path="/lawn-maintenance" element={<Lawnmaintenance />} />
            <Route path="/planting-replanting" element={<Plantingreplanting />} />
            <Route path="/hedge-trimming" element={<Trimming />} />
            <Route path="/pest-control-plants" element={<Pestcontrolforplants />} />
            <Route path="/fertilizer-treatment" element={<Fertilizertreatment />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Customer Routes */}
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />
            {/* Service Provider Routes */}
            <Route path="/provider/register" element={<RegisterProvider />} />
            <Route path="/provider/login" element={<LoginProvider />} />
            <Route
              path="/provider/dashboard"
              element={
                <ProtectedRoute requiredRole="service_provider">
                  <ProviderDashboard />
                </ProtectedRoute>
              }
            />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Router>
        <AppRouter darkMode={darkMode} setDarkMode={setDarkMode} />
      </Router>
    </div>
  );
};

export default App;
