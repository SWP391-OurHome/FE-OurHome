import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './PropertyDetails.css';
import ImageGallery from '../../page/ImageGallery/ImageGallery';
import { createBooking } from '../../services/bookingService';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pricingRef = useRef(null);
  const propertyDetailsRef = useRef(null);
  const footerRef = useRef(null);
const { id: propertyId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching property:', id);
        const [detailRes, listingRes] = await Promise.all([
          axios.get(`http://localhost:8082/api/listing/${id}`),
          axios.get(`http://localhost:8082/api/listings/${id}`)
        ]);

        const detail = detailRes.data;
        const listing = listingRes.data;

        setProperty({
          propertyID: detail.propertyID,
          title: detail.addressLine1 || 'No title available',
          addressLine1: detail.addressLine1,
          addressLine2: detail.addressLine2,
          location: `${detail.region || ''}, ${detail.city || ''}`,
          city: detail.city,
          region: detail.region,
          price: detail.price || 'Contact for price',
          image: detail.imgURL,
          images: detail.images || [],
          type: detail.propertyType,
          purpose: detail.purpose,
          area: detail.area,
          interior: detail.interior,
          bedrooms: detail.numBedroom,
          compares: detail.numCompares,
          bathrooms: detail.numBathroom,
          floor: detail.floor,
          privatePool: detail.privatePool,
          landType: detail.landType,
          legalStatus: detail.legalStatus,
          description: listing.description || '',
          amenities: [
            detail.numBedroom > 0 ? 'Bedroom' : null,
            detail.numBathroom > 0 ? 'Bathroom' : null,
            detail.privatePool ? 'Private Pool' : null,
            'TV',
            'Washing machine',
          ].filter(Boolean),
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property or listing:', error);
        setError('Unable to load data.');
        setLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => {
      const pricingElement = pricingRef.current;
      const propertyDetailsElement = propertyDetailsRef.current;
      const footerElement = footerRef.current;
      if (pricingElement && propertyDetailsElement && footerElement) {
        const propertyDetailsRect = propertyDetailsElement.getBoundingClientRect();
        const pricingRect = pricingElement.getBoundingClientRect();
        const footerRect = footerElement.getBoundingClientRect();

        const navbarHeight = 64;
        const gap = 16;
        const topOffset = navbarHeight + gap;

        const propertyDetailsTop = propertyDetailsRect.top + window.scrollY;
        const propertyDetailsBottom = propertyDetailsRect.bottom + window.scrollY;
        const footerTop = footerRect.top + window.scrollY;

        const pricingHeight = pricingRect.height;

        if (window.scrollY <= propertyDetailsTop) {
          pricingElement.style.position = 'static';
        } else if (window.scrollY > propertyDetailsTop) {
          const maxStickyBottom = Math.min(propertyDetailsBottom, footerTop) - pricingHeight - topOffset;
          if (window.scrollY < maxStickyBottom) {
            pricingElement.style.position = 'sticky';
            pricingElement.style.top = `${topOffset}px`;
          } else {
            pricingElement.style.position = 'absolute';
            pricingElement.style.top = `${maxStickyBottom - window.scrollY + pricingHeight}px`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!property) return <div>Property not found</div>;

  const fullAddress = [
    property.addressLine1,
    property.addressLine2,
    property.region,
    property.city,
    'Vietnam'
  ].filter(Boolean).join(', ');
const handleBooking = async () => {
  try {
    const stored = JSON.parse(localStorage.getItem("user"));

    // Kiểm tra dữ liệu user trong localStorage
    // sửa đoạn này nhé
    // lúc key nó để là userid lúc là id
    // nếu lỗi thì cứ sửa ơr đây =))), đếm đám thg làm login di
const userId = stored?.id;
    console.log("🔐 UserID dùng để booking:", userId);

    const result = await createBooking(userId, parseInt(propertyId));

    if (result.success) {
      console.log("✅ Booking thành công:", result);
      setTimeout(() => {
        window.location.href = "zalo://conversation?phone=0375523715";
      }, 100);
    } else {
      console.warn("⚠️ Booking thất bại:", result.message);
      alert(result.message || "Không thể đặt booking.");
    }
  } catch (error) {
    console.error("❌ Lỗi khi gọi API booking:", {
      message: error.message,
      responseData: error.response?.data,
      status: error.response?.status,
    });
    alert("Đã xảy ra lỗi khi lưu thông tin. Vui lòng thử lại.");
  }
};


  return (
      <>
        <Navbar />
        <div className="container property-details" ref={propertyDetailsRef}>
          <div className="property-main row">
            <div className="property-main-left col-lg-8 col-md-12">
              {property.images.length > 0 && <ImageGallery images={property.images} />}
              <div className="property-info1">
                <div className="property-info1-meta">
                  <h1>{property.title}</h1>
                <div className="location">
                  <i className="bi bi-geo-alt me-2"></i> {property.location}
                </div>
                </div>
                <div className="details">
                  {property.bedrooms > 0 && (
                      <span><i class="fas fa-bed"></i>{property.bedrooms} Bedrooms</span>
                  )}
                  {property.bathrooms > 0 && (
                      <span><i className="bi bi-droplet"></i>{property.bathrooms} Bathrooms</span>
                  )}
                  <span><i className="bi bi-rulers"></i>{property.area} m²</span>
                  {property.floor && (
                      <span><i className="bi bi-building"></i>{property.floor}th Floor</span>
                  )}
                </div>
              </div>

              <div className="property-description">
                <h2>Description</h2>
                {property.description.split('\n').map((line, i) => (
                    line.trim() && (
                        <p key={i}>
                          • {line.trim()}
                        </p>
                    )
                ))}
              </div>


              <div className="property-full-details">
                <h2>Property Details</h2>
                <div className="details-grid">
                  <div className="detail-item"><strong>Address:</strong> {property.addressLine1} {property.addressLine2 && `, ${property.addressLine2}`}</div>
                  <div className="detail-item"><strong>Area:</strong> {property.location}</div>
                  <div className="detail-item"><strong>Type:</strong> {property.type}</div>
                  <div className="detail-item"><strong>Purpose:</strong> {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}</div>
                  <div className="detail-item"><strong>Size:</strong> {property.area} m²</div>
                  <div className="detail-item"><strong>Bedrooms:</strong> {property.bedrooms}</div>
                  <div className="detail-item"><strong>Bathrooms:</strong> {property.bathrooms}</div>
                  <div className="detail-item"><strong>Floor:</strong> {property.floor}</div>
                  <div className="detail-item"><strong>Private Pool:</strong> {property.privatePool ? 'Yes' : 'No'}</div>
                  <div className="detail-item"><strong>Land Type:</strong> {property.landType}</div>
                  <div className="detail-item"><strong>Legal Status:</strong> {property.legalStatus}</div>
                </div>
              </div>

              <div className="amenities">
                <h2>Amenities</h2>
                <div className="amenities-list">
                  {property.amenities.map((a, i) => <span key={i}>{a}</span>)}
                </div>
              </div>

              <div className="neighborhood">
                <h2>Neighborhood</h2>
                <p>Nearby restaurants, cafes, beaches...</p>
              </div>

              <div className="location-map">
                <h2>Location</h2>
                <iframe
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '8px' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                    title="Google Map"
                ></iframe>
              </div>
            </div>

            <div className="property-main-right col-lg-4 col-md-12" ref={pricingRef}>
              <div className="pricing">
                <div className="price">{property.price}</div>
                {property.purpose === 'rent' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ margin: 0 }}>Rent includes utilities</p>
                      <input type="date" defaultValue="2025-06-10" style={{ width: '100%', maxWidth: '400px', marginBottom: '10px', marginTop:'10px' }} />
                  <input type="date" defaultValue="2025-07-10" style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }} />
                 <button
  style={{ width: 'fit-content', padding: '0.5rem 1rem' }}
  onClick={handleBooking}>Continue Booking</button>
                </div>
                ) : (
                    <div>
                      <p>One-time payment</p>
                      <button
                    style={{ width: 'fit-content', padding: '0.5rem 1rem' }}
                     onClick={handleBooking}>Continue Booking</button>
                    </div>

                )}
              </div>
            </div>
              </div>
            </div>

            <div className="footer-wrapper">
              <Footer ref={footerRef} />
            </div>
          </>
          );
          };




          export default PropertyDetails;