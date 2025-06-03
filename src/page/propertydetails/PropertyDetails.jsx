import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import testpicture from "../../Assets/testpicture.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import các components theo thư mục của bạn
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const pricingRef = useRef(null);
  const propertyDetailsRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const properties = [
      {
        id: 1,
        title: "Modern Apartment with Sea View",
        location: "Đà Nẵng",
        price: "8 million/month",
        image: "https://via.placeholder.com/800x400",
        type: "Apartment",
        purpose: "rent",
        description: "A modern apartment with stunning sea views.",
        amenities: [
          "TV",
          "Fireplace",
          "Bedroom",
          "Bathroom",
          "Coffee machine",
          "Washing machine",
          "Iron",
          "Wardrobe",
        ],
        bedrooms: 2,
        bathrooms: 1,
        area: "500 sq ft",
        floor: "3rd Floor | Elevator",
      },
      {
        id: 2,
        title: "Luxury Villa near My Khe Beach",
        location: "Đà Nẵng",
        price: "25 million/month",
        image: "https://via.placeholder.com/800x400",
        type: "Villa",
        purpose: "rent",
        description: "A luxurious villa with beach access.",
        amenities: ["TV", "Fireplace", "Bedroom", "Bathroom", "Coffee machine"],
        bedrooms: 4,
        bathrooms: 3,
        area: "1000 sq ft",
        floor: "Ground Floor",
      },
      {
        id: 3,
        title: "3BR House in Hoa Xuan, Cam Le",
        location: "Đà Nẵng",
        price: "2.8 billion VND",
        image: "https://via.placeholder.com/800x400",
        type: "House",
        purpose: "buy",
        description: "A spacious 3-bedroom house.",
        amenities: ["TV", "Bedroom", "Bathroom", "Washing machine"],
        bedrooms: 3,
        bathrooms: 2,
        area: "700 sq ft",
        floor: "2 Floors",
      },
      {
        id: 4,
        title: "Beachside Land Plot – Ngu Hanh Son",
        location: "Đà Nẵng",
        price: "3.5 billion VND",
        image: "https://via.placeholder.com/800x400",
        type: "Land",
        purpose: "buy",
        description: "A prime land plot near the beach.",
        amenities: [],
        bedrooms: 0,
        bathrooms: 0,
        area: "1000 sq ft",
        floor: "N/A",
      },
      {
        id: 5,
        title: "Penthouse Apartment – Ocean View",
        location: "Đà Nẵng",
        price: "6.2 billion VND",
        image: "https://via.placeholder.com/800x400",
        type: "Apartment",
        purpose: "buy",
        description: "A luxurious penthouse with ocean views.",
        amenities: ["TV", "Fireplace", "Bedroom", "Bathroom", "Coffee machine", "Iron"],
        bedrooms: 3,
        bathrooms: 2,
        area: "800 sq ft",
        floor: "10th Floor | Elevator",
      },
    ];
    const foundProperty = properties.find((p) => p.id === parseInt(id));
    setProperty(foundProperty);

    // Thêm sự kiện cuộn
    const handleScroll = () => {
      const pricingElement = pricingRef.current;
      const propertyDetailsElement = propertyDetailsRef.current;
      const footerElement = footerRef.current;
      if (pricingElement && propertyDetailsElement && footerElement) {
        const propertyDetailsRect = propertyDetailsElement.getBoundingClientRect();
        const pricingRect = pricingElement.getBoundingClientRect();
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Chiều cao navbar là 4rem (64px) dựa trên navbar.css
        const navbarHeight = 64; // 4rem = 64px
        const gap = 16; // 1rem = 16px
        const topOffset = navbarHeight + gap; // Tổng khoảng cách từ top: 80px

        // Tính vị trí của .property-details và footer so với top của viewport
        const propertyDetailsTop = propertyDetailsRect.top + window.scrollY;
        const propertyDetailsBottom = propertyDetailsRect.bottom + window.scrollY;
        const footerTop = footerRect.top + window.scrollY;

        // Chiều cao của pricing
        const pricingHeight = pricingRect.height;

        // Khi cuộn lên trên cùng của .property-details, quay về static
        if (window.scrollY <= propertyDetailsTop) {
          pricingElement.style.position = "static";
          pricingElement.style.top = "auto";
          pricingElement.style.bottom = "auto";
          pricingElement.style.right = "auto";
          pricingElement.style.width = "auto";
        } 
        // Khi cuộn xuống dưới top của .property-details, áp dụng sticky
        else if (window.scrollY > propertyDetailsTop) {
          // Kiểm tra nếu pricing chạm đáy của .property-details hoặc gần footer
          const maxStickyBottom = Math.min(propertyDetailsBottom, footerTop) - pricingHeight - topOffset;

          if (window.scrollY < maxStickyBottom) {
            // Chế độ sticky bình thường
            pricingElement.style.position = "sticky";
            pricingElement.style.top = `${topOffset}px`;
            pricingElement.style.bottom = "auto";
            pricingElement.style.right = "auto";
            pricingElement.style.width = "auto";
          } else {
            // Khi cuộn xuống hết, chuyển sang absolute để dừng ngay trước footer
            pricingElement.style.position = "absolute";
            pricingElement.style.top = `${maxStickyBottom - window.scrollY + pricingHeight}px`;
            pricingElement.style.bottom = "auto";
            pricingElement.style.right = "1.5rem"; // Căn phải với padding của .property-details
            pricingElement.style.width = `${pricingRect.width}px`; // Giữ nguyên chiều rộng
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Cập nhật khi thay đổi kích thước
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <>
      {/* Header Navigation */}
      <Navbar />

      {/* Property Details Content */}
      <div className="property-details" ref={propertyDetailsRef}>
        {/* Header with Images */}
        <div className="property-header">
          <div className="main-image">
            <img src={testpicture} alt={property.title} />
          </div>
          <div className="gallery">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={testpicture} alt={`Gallery ${i}`} />
            ))}
          </div>
        </div>

        <div className="property-main">
          {/* Main Content */}
          <div className="property-main-left">
            {/* Property Info */}
            <div className="property-info">
              <div className="property-info-meta">
                <div>
                  <h1>{property.title}</h1>
                  <div className="location">
                    <i className="bi bi-geo-alt me-2"></i> {property.location}
                  </div>
                </div>
                <div className="details">
                  {property.bedrooms > 0 && (
                    <span>
                      <i className="bi bi-bed me-2"></i> {property.bedrooms} Bedrooms
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span>
                      <i className="bi bi-droplet me-2"></i> {property.bathrooms} Bath
                    </span>
                  )}
                  <span>
                    <i className="bi bi-rulers me-2"></i> {property.area}
                  </span>
                  <span>
                    <i className="bi bi-building me-2"></i> {property.floor}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="property-description">
              <h2>Description</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities">
              <h2>Amenities</h2>
              <div className="amenities-list">
                {property.amenities.length > 0 ? (
                  property.amenities.map((amenity, index) => (
                    <span key={index}>
                      {amenity === "TV" && <i className="bi bi-tv me-2"></i>}
                      {amenity === "Fireplace" && <i className="bi bi-fire me-2"></i>}
                      {amenity === "Bedroom" && <i className="bi bi-bed me-2"></i>}
                      {amenity === "Bathroom" && <i className="bi bi-droplet me-2"></i>}
                      {amenity === "Coffee machine" && <i className="bi bi-cup-hot me-2"></i>}
                      {amenity === "Washing machine" && <i className="bi bi-water me-2"></i>}
                      {amenity === "Iron" && <i className="bi bi-tools me-2"></i>}
                      {amenity === "Wardrobe" && <i className="bi bi-cabinet me-2"></i>}
                      {amenity}
                    </span>
                  ))
                ) : (
                  <p>No amenities available.</p>
                )}
              </div>
            </div>

            {/* Neighborhood */}
            <div className="neighborhood">
              <h2>Neighbourhood</h2>
              <p>
                Utterly etiam aliquet non senectus, elementum etiam sit amet, sed et eget facilisis pellentesque. Mauris facilisis non vulput ante lorem pharetra a.
              </p>
            </div>

            {/* Location */}
            <div className="location-map">
              <h2>Location</h2>
              <div className="map">
                <img src={testpicture} alt="Property Location" />
              </div>
            </div>

            {/* Policy Details */}
            <div className="policy-details">
              <h2>Policy Detail</h2>
              <div className="policy-sections">
                <div className="policy-section">
                  <h3>House Rules</h3>
                  <ul>
                    <li>Check-in time</li>
                    <li>No smoking</li>
                    <li>No pets</li>
                    <li>No parties or events</li>
                  </ul>
                </div>
                <div className="policy-section">
                  <h3>Cancellation Policy</h3>
                  <p>Free Cancellation up to 24hrs before check-in</p>
                </div>
                <div className="policy-section">
                  <h3>Health & Safety</h3>
                  <p>Cleaner in accordance with our COVID-safe cleaning policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Pricing) */}
          <div className="property-main-right" ref={pricingRef}>
            <div className="pricing">
              <div className="price">{property.price}</div>
              {property.purpose === "rent" && (
                <div className="move-in">
                  <label>Move in</label>
                  <input type="date" defaultValue="2023-11-21" />
                  <label>Move out</label>
                  <input type="date" defaultValue="2023-12-31" />
                </div>
              )}
              <div className="additional-costs">
                {property.purpose === "rent" ? (
                  <>
                    <p>All utilities included</p>
                    <p>Average monthly rent: £270</p>
                    <p>Pay upfront: £1,087.23</p>
                    <p>Total costs: £4,003.70</p>
                    <button>Continue Booking</button>
                  </>
                ) : (
                  <>
                    <p>One-time payment</p>
                    <button>Contact for Purchase</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default PropertyDetails;