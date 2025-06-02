import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../../services/authService';
import './google-callback.css';

export default function GoogleCallback() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        const error = queryParams.get("error");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/"); // ✅ về home
        } else {
            setError(error || "Đăng nhập Google thất bại.");
            setLoading(false);
        }
    }, [location]);


    return (
        <div className="google-callback-container">
            <div className="callback-content">
                {loading ? (
                    <>
                        <div className="loading-spinner"></div>
                        <h2>Đang xử lý đăng nhập...</h2>
                        <p>Vui lòng đợi trong giây lát</p>
                    </>
                ) : (
                    <>
                        <div className="error-icon">❌</div>
                        <h2>Đăng nhập thất bại</h2>
                        <p>{error}</p>
                        <button
                            className="back-to-login"
                            onClick={() => navigate('/login')}
                        >
                            Quay lại trang đăng nhập
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}