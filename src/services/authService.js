import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

export const login = async (email, password) => {
  try {
    // Gửi đúng body mà backend đang yêu cầu
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email, // hoặc username nếu backend yêu cầu
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
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
        data: data,
      };
    } else {
      // Đăng nhập thất bại có phản hồi hợp lệ từ BE
      return {
        success: false,
        message: data.message || "Invalid credentials",
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
      message: errorMessage,
    };
  }
};

export const loginWithGoogle = async () => {
  const response = await axios.get(`${API_URL}/google-login-url`);
  window.location.href = response.data.url;
};

export const handleGoogleCallback = async (code) => {
  try {
    const response = await axios.get(`${API_URL}/oauth2/callback`, {
      params: {
        code,
        state: btoa("http://localhost:3000/google-callback"),
      },
    });

    // Nhận dữ liệu từ BE
    const { token, user } = response.data;

    // Lưu vào localStorage nếu cần
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error("Callback error:", error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    console.log("➡️ Sending form:", formData);
    const response = await axios.post(
      `${API_URL}/signup`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error creating account";
    return {
      success: false,
      message: message,
    };
  }
};

// Function to send OTP
export const sendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/sendOtp`, { email });

    // Kiểm tra phản hồi và trả về thông báo cùng với success (boolean)
    return {
      success: response.data.success,
      message: response.data.message || "OTP sent to your email.",
    };
  } catch (error) {
    console.error("Error sending OTP", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to send OTP. Please try again.",
    };
  }
};

// Function to verify OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/verify-gmail`, {
      email,
      otp,
    });

    // Kiểm tra phản hồi và trả về thông báo cùng với success (boolean)
    return {
      success: response.data.success,
      message: response.data.message || "OTP verified successfully.",
    };
  } catch (error) {
    console.error("Error verifying OTP", error);
    return {
      success: false,
      message: error.response
        ? error.response.data.message
        : "Failed to verify OTP. Please try again.",
    };
  }
};

export default {
  login,
  loginWithGoogle,
  handleGoogleCallback,
  register,
};
