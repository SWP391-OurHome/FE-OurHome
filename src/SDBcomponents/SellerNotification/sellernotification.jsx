import React, { useState, useEffect } from "react";
import { getAllBookings, markAsViewed } from "../../services/bookingService";
import "./SellerNotifications.css";

const Notifications = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi lấy booking:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleMarkAsViewed = async (bookingId) => {
    try {
      await markAsViewed(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, viewed: true } : b))
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đã xem:", error);
    }
  };

  const formatDateTime = (raw) => {
  if (!raw) return "Không rõ thời gian";

  // "2025-06-25 15:24:34.029224" -> "2025-06-25T15:24:34"
  const clean = raw.replace(" ", "T").split(".")[0];
  const date = new Date(clean);
  if (isNaN(date.getTime())) return "Không hợp lệ";

  const pad = (n) => (n < 10 ? "0" + n : n);

  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

  return (
    <div className="seller-notifications">
      <h2>Danh sách booking</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>SĐT</th>
            <th>Email</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.firstName + " " + b.lastName}</td>
              <td>{b.phone}</td>
              <td>{b.email}</td>
              <td>{formatDateTime(b.bookingTime)}</td>
              <td>
                {!b.viewed ? (
                  <button onClick={() => handleMarkAsViewed(b.id)}>
                    Đánh dấu đã xem
                  </button>
                ) : (
                  <span style={{ color: "green" }}>Đã xem</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;
