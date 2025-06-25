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

        const id = queryParams.get("userId");
        const name = queryParams.get("name");
        const email = queryParams.get("email");
        const picture = queryParams.get("picture");
        const role = queryParams.get("role") ;
        const birthDay = queryParams.get("birthday");
        console.log(token, error, id, name, email, picture, role, birthDay);
        if (token) {

            localStorage.setItem("token", token);
            localStorage.setItem("role", role.toLowerCase());

            const user = { id, name, email, picture, birthDay };
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/"); // ✅ về Home sau khi đã có dữ liệu
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