import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './page/homepage/HomePage';
import Login from './page/authentication/login/Login';
import GoogleCallback from './page/authentication/Google-CallBack/google-callback';
import PropertyDetails from './page/propertydetails/PropertyDetails'; // Cập nhật đường dẫn
import Dashboard from './page/Dashboard/Dashboard';
import SellerDashboard from './page/sellerdashboard/SellerDashboard';
import VerifyGoogle from './page/authentication/VerifyEmail/VerifyGoogle';
import PhoneAuth from './page/authentication/VerifyPhone/verifyphone'
import ForgotPassword from "./page/authentication/ForgotPassword/ForgotPassword";
import SignUp from "./page/authentication/signup/SignUp";
import Error404 from './page/404error/Error404';
import Sale from './page/salepage/Sale';
import Profile from './page/authentication/Profile/profile';
import ChangePassWord from './page/authentication/ChangePassWord/changepassword';
import AgentDetails from './page/agentdetails/AgentDetails';
import Logout from "./DBcomponents/Logout/Logout";
import Wishlist from './page/wishlist/Wishlist';
import Membership from './page/membership/Membership';
 // Đảm bảo đường dẫn đúng theo cấu trúc dự án
// Components for Dashboard
import StatsCards from './DBcomponents/Statscards/Statscards';
import RevenueChart from './DBcomponents/RevenueChart/RevenueChart';
import Transactions from './DBcomponents/Transactions/Transactions';
import Users from './DBcomponents/Users/Users';
import Settings from './DBcomponents/Settings/Setting';
import Notifications from './DBcomponents/Notifications/Notifications';
import Sidebar from './DBcomponents/Sidebar/Sidebar';
import Header from './DBcomponents/Header/Header';
 // Placeholder components for new routes
// import Support from "./DBcomponents/Support/Support";
// import Reports from "./DBcomponents/Reports/Reports";

// Components for SellerDashboard
import RecentProperties from "./SDBcomponents/RecentProperties/RecentProperties";
import SalesAnalytics from "./SDBcomponents/SalesAnalytics/SalesAnalytics";
import StatsCardsSeller from "./SDBcomponents/StatsCards/StatsCards";
import SellerNotifications from "./SDBcomponents/SellerNotification/sellernotification";
function App() {
    return (


        <Router>
            <div className="App">
                {/* Thông báo popup (toast) */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {/* Định tuyến các trang */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/google-callback" element={<GoogleCallback />} />
                    <Route path="/property/:id" element={<PropertyDetails />} /> {/* Route cho PropertyDetails */}
                    {/* <Route path='/dashboard' element={<Dashboard />} /> */}
                    <Route path="/seller" element={<SellerDashboard />}>
                        <Route index element={<RecentProperties />} />
                        <Route path="dashboard" element={<RecentProperties />} />
                        <Route path="analytics" element={<SalesAnalytics />} />
                        <Route path="add-property" element={<div>Add Property Placeholder</div>} />
                        <Route path="statscards" element={<StatsCardsSeller />} />
                        <Route path="notifications" element={<SellerNotifications />} />
                        <Route path="logout" element={<Logout />} />
                    </Route>
                    {/* <Route path='/sellerdashboard' element={<SellerDashboard />} /> */}
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<StatsCards />} />
                        <Route path="overview" element={<StatsCards />} />
                        <Route path="analytics" element={<RevenueChart />} />
                        <Route path="transactions" element={<Transactions />} />
                        <Route path="users" element={<Users />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="notifications" element={<Notifications />} />
                 {/* <Route path="support" element={<Support />} />
                 <Route path="reports" element={<Reports />} /> */}
                        <Route path="logout" element={<Logout />} />
                    </Route>
                    <Route path='/sale' element={<Sale />} />
                    {/*<Route path='*' element={<Error404 />} />*/}
                    <Route path='/verify-gmail' element={<VerifyGoogle />} />
                    <Route path='/verify-phone' element={<PhoneAuth />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/changepassword' element={<ChangePassWord />} />
                    <Route path="/agent/:agentId" element={<AgentDetails />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/membership" element={<Membership />} />
                    {/* Mở rộng sau:
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          ... */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;