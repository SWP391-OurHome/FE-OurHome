import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Bỏ comment dòng import toastify CSS


// Pages
import HomePage from './page/homepage/HomePage';
import Login from './page/authentication/login/Login';
import GoogleCallback from './page/authentication/Google-CallBack/google-callback';
import SignUp from "./page/authentication/signup/SignUp";

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
                    <Route path="/signup" element={<SignUp />} />

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
