import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

export const login = async (email, password) => {
    try {
        // Gửi đúng body mà backend đang yêu cầu
        const response = await axios.post(
            `${API_URL}/login`,
            {
                email, // hoặc username nếu backend yêu cầu
                password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        // Kiểm tra phản hồi từ backend
        const data = response.data;

        if (data && data.success) {
            // Lưu user vào localStorage nếu cần
            localStorage.setItem("user", JSON.stringify(data));

            return {
                success: true,
                message: data.message || "Login successful",
                data: data
            };
        } else {
            // Đăng nhập thất bại có phản hồi hợp lệ từ BE
            return {
                success: false,
                message: data.message || "Invalid credentials"
            };
        }
    } catch (error) {
        let errorMessage = "Đã xảy ra lỗi khi đăng nhập";

        if (error.response) {
            const data = error.response.data;
            if (typeof data === "string") {
                errorMessage = data;
            } else if (data && data.message) {
                errorMessage = data.message;
            } else {
                errorMessage = `Lỗi ${error.response.status}: ${error.response.statusText}`;
            }
        } else if (error.request) {
            errorMessage = "Không thể kết nối đến server";
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};

const loginWithGoogle = async () => {
    try {
        const response = await axios.get(API_URL + 'google-login-url');

        // Chuyển hướng người dùng đến URL đăng nhập Google
        window.location.href = response.data.url;

        return response.data;
    } catch (error) {
        throw error;
    }
};
