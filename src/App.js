import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './page/homepage/HomePage';
import Login from './page/authentication/login/Login';
import GoogleCallback from './page/authentication/Google-CallBack/google-callback';
import PropertyDetails from './page/propertydetails/PropertyDetails'; // Cập nhật đường dẫn
import Dashboard from './page/dashboardadmin/Dashboard';
import SellerDashboard from './page/sellerdashboard/SellerDashboard';
import VerifyGoogle from './page/authentication/VerifyEmail/VerifyGoogle';
import PhoneAuth from './page/authentication/VerifyPhone/verifyphone'
import ForgotPassword from "./page/authentication/ForgotPassword/ForgotPassword";
import SignUp from "./page/authentication/signup/SignUp";
import Error404 from './page/404error/Error404';
import Sale from './page/salepage/Sale';
import Profile from './page/authentication/Profile/profile';
import ChangePassWord from './page/authentication/ChangePassWord/changepassword';

 // Đảm bảo đường dẫn đúng theo cấu trúc dự án

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
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/sellerdashboard' element={<SellerDashboard />} />
                    <Route path='/sale' element={<Sale />} />
                    {/*<Route path='*' element={<Error404 />} />*/}
                    <Route path='/verify-gmail' element={<VerifyGoogle />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/changepassword' element={<ChangePassWord />} />
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