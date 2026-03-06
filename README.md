# Fixify - Home Services Platform

A modern, full-stack home services platform built with React, TypeScript, Vite, and a FastAPI backend. Fixify connects customers with verified service providers for various household services.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Frontend Routes](#frontend-routes)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Integration Status](#integration-status)
- [Development Guide](#development-guide)

## ✨ Features

### Customer Features
- ✅ User registration and authentication
- ✅ Browse and select services
- ✅ Book services with date/time selection
- ✅ View order history
- ✅ Profile management
- ✅ Submit complaints and contact forms
- ✅ Dark/Light mode toggle

### Service Provider Features
- ✅ Provider registration
- ✅ View available orders
- ✅ Pickup and complete orders
- ✅ Approval status tracking
- ✅ Provider dashboard with statistics
- ✅ Order management

### Admin Features
- ✅ Provider approval/rejection
- ✅ View all providers and customers
- ✅ Monitor orders
- ✅ View statistics and analytics
- ✅ Manage contact messages

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (fast HMR)
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Context API** - State management

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **JWT** - Authentication

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Dropdown.tsx
│   ├── SocialIcon.tsx
│   ├── OrderDetailModal.tsx
│   ├── ProviderDetailModal.tsx
│   ├── RescheduleOrderModal.tsx
│   ├── ReviewModal.tsx
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Services.tsx
│   ├── Checkout.tsx
│   ├── ContactUs.tsx
│   ├── AboutUs.tsx
│   ├── FAQs.tsx
│   ├── PrivacyPolicy.tsx
│   ├── Terms&Conditions.tsx
│   ├── service-provider/
│   │   ├── LoginProvider.tsx
│   │   ├── RegisterProvider.tsx
│   │   └── ProviderDashboard.tsx
│   ├── admin/
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   └── services/       # Service detail pages
│       ├── Services.tsx
│       ├── carpenter/
│       ├── cleaning/
│       ├── electricianing/
│       ├── gardening/
│       ├── mechanical/
│       ├── moving/
│       ├── painting/
│       ├── plumbing/
│       └── technicianing/
├── services/           # API services
│   ├── api.ts         # Axios instance
│   ├── authService.ts
│   ├── orderService.ts
│   ├── providerService.ts
│   ├── adminService.ts
│   ├── customerService.ts
│   ├── contactService.ts
│   ├── messageService.ts
│   └── reviewService.ts
├── contexts/           # React Context
│   └── AuthContext.tsx # Authentication context
├── config/            # Configuration
│   └── api.ts        # API endpoints
├── utils/            # Utility functions
│   ├── jwt.ts
│   └── imageOptimization.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css         # Global styles
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python 3.8+ (for backend)
- FastAPI backend running

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Frontend/Fixify
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Axios (If Needed)
If you encounter a white screen or axios-related errors:
```bash
npm install axios
```

### Step 4: Create Environment File
Create a `.env` file in the project root:
```env
VITE_API_BASE_URL=https://fixify-backend-321f.onrender.com
```

### Step 5: Start Backend (If Not Running)
In a separate terminal:
```bash
cd Backend/app
uvicorn main:app --reload
```

## 🏃 Running the Project

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Tests (if available)
```bash
npm run test
```

### Lint Code
```bash
npm run lint
```

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=https://fixify-backend-321f.onrender.com

# Other configurations (add as needed)
```

## 🗺 Frontend Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.tsx | Homepage |
| `/login` | Login.tsx | Customer login |
| `/register` | Register.tsx | Customer registration |
| `/services` | Services.tsx | Browse all services |
| `/how-it-works` | HowitWorks.tsx | How the platform works |
| `/about` | AboutUs.tsx | About us page |
| `/contact` | ContactUs.tsx | Contact form |
| `/faqs` | FAQs.tsx | Frequently asked questions |
| `/privacy` | PrivacyPolicy.tsx | Privacy policy |
| `/terms` | Terms&Conditions.tsx | Terms and conditions |

### Provider Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/provider/login` | LoginProvider.tsx | Provider login |
| `/provider/register` | RegisterProvider.tsx | Provider registration |
| `/provider/dashboard` | ProviderDashboard.tsx | Provider dashboard (protected) |

### Admin Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/login` | AdminLogin.tsx | Admin login |
| `/admin/dashboard` | AdminDashboard.tsx | Admin dashboard (protected) |

### Customer Routes (Protected)

| Route | Component | Description |
|-------|-----------|-------------|
| `/checkout` | Checkout.tsx | Order creation |
| `/customer/orders` | CustomerOrders.tsx | Order history |
| `/customer/profile` | CustomerProfile.tsx | Profile management |

### Service Detail Routes

| Category | Example Routes |
|----------|---|
| Carpenter | `/services/carpenter`, `/services/carpenter/bed-repair`, etc. |
| Cleaning | `/services/cleaning`, `/services/cleaning/home-cleaning`, etc. |
| Electrician | `/services/electricianing`, `/services/electricianing/light-repair`, etc. |
| Gardening | `/services/gardening`, `/services/gardening/lawn-mowing`, etc. |
| Mechanical | `/services/mechanical`, `/services/mechanical/ac-repair`, etc. |
| Moving | `/services/moving`, `/services/moving/home-relocation`, etc. |
| Painting | `/services/painting`, `/services/painting/interior-painting`, etc. |
| Plumbing | `/services/plumbing`, `/services/plumbing/pipe-repair`, etc. |
| Technical | `/services/technicianing`, `/services/technicianing/computer-repair`, etc. |

## 🔌 API Endpoints

### Authentication Endpoints

```
POST /auth/login
- Body: { email: string, password: string }
- Response: { access_token: string, user: UserData }

POST /auth/register
- Body: { name: string, email: string, password: string, phone: string }
- Response: { user: UserData }

POST /auth/register-provider
- Body: { name: string, email: string, password: string, phone: string, services: string[] }
- Response: { user: UserData }
```

### Customer Endpoints

```
GET /customer/profile
- Response: Customer profile data

PUT /customer/profile
- Body: Customer data to update
- Response: Updated profile

POST /customer/orders
- Body: { service_id: int, date: string, time: string, address: string, notes: string }
- Response: { order: OrderData }

GET /customer/orders
- Response: List of customer orders
```

### Provider Endpoints

```
GET /provider/profile
- Response: Provider profile data

GET /provider/approval-status
- Response: { status: string, is_approved: boolean }

GET /provider/orders/available
- Response: List of available orders

POST /provider/orders/{id}/pickup
- Response: Updated order

POST /provider/orders/{id}/complete
- Response: Updated order

GET /provider/orders
- Response: List of provider's orders
```

### Admin Endpoints

```
GET /admin/providers/pending
- Response: List of pending providers

POST /admin/providers/{id}/approve
- Response: Updated provider

POST /admin/providers/{id}/reject
- Body: { reason: string }
- Response: Updated provider

GET /admin/orders
- Response: List of all orders

GET /admin/stats
- Response: Statistics data
```

### Contact Endpoints

```
POST /contact
- Body: { name: string, email: string, message: string }
- Response: Confirmation message
```

## 🐛 Troubleshooting

### White Screen Issue

**Problem**: App shows a white/blank screen on startup

**Solutions**:

1. **Install Axios** (Most Common)
   ```bash
   npm install axios
   ```

2. **Restart Dev Server**
   ```bash
   npm run dev
   ```

3. **Check Browser Console** (F12)
   - Look for error messages
   - Common errors:
     - "Failed to resolve import 'axios'" → Run `npm install axios`
     - "Module not found" → Run `npm install`

4. **Clear Cache and Reinstall**
   ```bash
   npm cache clean --force
   npm install
   npm run dev
   ```

5. **Verify Node/npm**
   ```bash
   node --version
   npm --version
   ```

### Backend Connection Issues

**Problem**: API calls fail or backend unreachable

**Solutions**:

1. **Check Backend is Running**
   - Visit `https://fixify-backend-321f.onrender.com/docs` in browser
   - Should show FastAPI Swagger documentation

2. **Verify Environment Variables**
   - Check `.env` file has correct `VITE_API_BASE_URL`
   - Default: `https://fixify-backend-321f.onrender.com`

3. **Check CORS Settings**
   - Backend must allow requests from `http://localhost:5173`

### 404 Routes Not Found

**Problem**: Getting 404 errors on valid routes

**Solutions**:

1. **Verify Route Exists in App.tsx**
   - Check route definition
   - Ensure spelling matches

2. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear cached data

3. **Restart Dev Server**
   ```bash
   npm run dev
   ```

### Import Errors

**Problem**: "Failed to resolve import" errors

**Solutions**:

1. **Install Missing Dependencies**
   ```bash
   npm install
   ```

2. **Check File Paths**
   - Verify import paths are correct
   - Use relative paths correctly

3. **Clear node_modules** (Last Resort)
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## ✅ Integration Status

### ✅ Completed
- API configuration and axios setup
- Authentication service and context
- Order service
- Provider service
- Admin service
- Contact service
- Login page integration
- Register page integration
- Provider dashboard integration
- Admin dashboard integration
- Checkout/order creation
- Contact form integration

### Features Working
- ✅ User authentication (login/register)
- ✅ Customer registration and login
- ✅ Service provider registration and login
- ✅ Admin login
- ✅ Provider dashboard with order management
- ✅ Admin dashboard with provider approval
- ✅ Order creation from checkout
- ✅ Contact/complaint form submissions
- ✅ Token-based authentication
- ✅ Automatic token injection in API requests
- ✅ Error handling and loading states
- ✅ Dark/Light mode
- ✅ Responsive design

## 💻 Development Guide

### Adding a New Service Page

1. Create service component in appropriate category:
   ```tsx
   // src/pages/services/<category>/<ServiceName>.tsx
   import { useNavigate } from "react-router-dom";
   
   const ServiceName = () => {
     const navigate = useNavigate();
     
     const handleBookService = () => {
       navigate("/checkout", {
         state: {
           serviceName: "Service Name",
           amount: 1000
         }
       });
     };
     
     return (
       <div>
         {/* Service content */}
         <button onClick={handleBookService}>Book Service</button>
       </div>
     );
   };
   
   export default ServiceName;
   ```

2. Add route to `App.tsx`:
   ```tsx
   {
     path: "/services/<category>/<service>",
     element: <ServiceComponent />
   }
   ```

3. Update service dropdown in Navbar if needed

### Adding API Integration

1. Create service in `src/services/`:
   ```tsx
   import api from "./api";
   
   const myService = {
     getdata: async () => {
       const response = await api.get("/endpoint");
       return response.data;
     }
   };
   
   export default myService;
   ```

2. Use in component:
   ```tsx
   import myService from "../services/myService";
   
   useEffect(() => {
     myService.getdata()
       .then(data => setData(data))
       .catch(err => setError(err));
   }, []);
   ```

### Protected Routes

To add route protection:

```tsx
// Use ProtectedRoute component
<Route 
  path="/protected" 
  element={
    <ProtectedRoute>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>
```

### Authentication with Context

```tsx
import { useAuth } from "../contexts/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user?.name}</div>;
};
```

## 📝 Notes

1. **JWT Token Storage**: Tokens are stored in localStorage
2. **Token Injection**: Automatically injected in API requests via axios interceptors
3. **Dark Mode**: Managed at App level via state prop
4. **Responsive Design**: Tailwind CSS for mobile-first design
5. **Image Optimization**: Images use lazy loading for better performance

## 🔗 Related Documentation

The information from the following documentation files has been consolidated into this README:
- `INTEGRATION_GUIDE.md` - Integration setup details
- `INTEGRATION_COMPLETE.md` - Detailed integration status
- `ROUTE_REFERENCE.md` - Complete route reference
- `FIX_WHITE_SCREEN.md` - Troubleshooting guide
- `INSTALL_AXIOS.md` - Axios installation guide

## 🤝 Contributing

When contributing, please:

1. Follow the existing code style
2. Test your changes locally
3. Update relevant documentation
4. Use TypeScript for new components
5. Keep components reusable

## 📄 License

[Add your license information here]

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review existing issues
3. Contact the development team

---

**Last Updated**: December 8, 2025
**Version**: 1.0.0
# fixify_frontend
