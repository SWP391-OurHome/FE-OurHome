import axios from "axios";

const BOOKING_API = "http://localhost:8082/api/booking";

export const createBooking = async (userId, propertyId) => {
  try {
    const response = await axios.post(BOOKING_API, {
      userId,
      propertyId,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo booking:", error.response?.data || error.message);
    return { success: false, message: "Lỗi khi lưu booking" };
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axios.get(`${BOOKING_API}/all`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách booking:", error);
    return [];
  }
};

export const markAsViewed = async (bookingId) => {
  try {
    const response = await axios.put(`${BOOKING_API}/${bookingId}/view`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đã xem:", error);
    return null;
  }
};
