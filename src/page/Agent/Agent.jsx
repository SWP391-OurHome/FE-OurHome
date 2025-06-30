// src/components/SellerList.jsx
import React, { useEffect, useState } from "react";
import { getAllSellers } from "../../services/SellerService";
import "./Agent.css"; // import CSS thuần
import Header from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";

export default function SellerList() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const data = await getAllSellers();
        setSellers(data);
      } catch (err) {
        setError("Không thể tải danh sách sellers.");
      } finally {
        setLoading(false);
      }
    }
    fetchSellers();
  }, []);

  if (loading) return <p className="sellerlist-loading">Đang tải dữ liệu...</p>;
  if (error) return <p className="sellerlist-error">{error}</p>;
  if (sellers.length === 0)
    return <p className="sellerlist-empty">Chưa có seller nào.</p>;

  return (
    <div className="sellerlist-root">
      <Header />
      <main className="sellerlist-main">
        <h2 className="sellerlist-title">Seller List</h2>
        <div className="sellerlist-card-container">
          {sellers.map((seller) => (
            <div key={seller.userId} className="sellerlist-card">
              <div className="sellerlist-card-name">
                {seller.firstName} {seller.lastName}
              </div>
              <div className="sellerlist-card-email">
                <b>Email:</b> {seller.email}
              </div>
              <div className="sellerlist-card-phone">
                <b>Phone:</b> {seller.phone}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
