import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBath, FaBed, FaExpand, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import SellerService from "../../services/SellerService";
import customerService, {getUserInformation} from "../../services/cusomerService";
import DefaultAvatar from "../../Assets/img/DefaultAvatar.jpg";
import "./AgentDetails.css";

// Utility function to parse price strings to numbers (in millions)
const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const numericStr = priceStr.replace(/[^0-9.]/g, '');
    const value = parseFloat(numericStr);
    if (priceStr.includes("billion")) return value * 1000;
    return value;
};
const truncate = (str, maxLength = 30) => {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};


const AgentDetails = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        imgPath: "",
    });
    const { userId } = useParams();
    const [properties, setProperties] = useState([]);
    const [listings, setListings] = useState([]);
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    console.log("User ID:", userId);
    const fetchProfile = async (id) => {
        setMessage("");
        try {
            const data = await getUserInformation(userId);
            console.log("Server trả về:", data);
            setProfile(data);
            setFormData({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                phone: data.phone || "",
                birthday: data.birthday || "",
                imgPath: data.imgPath || data.ImgPath || "",
            });
        } catch (err) {
            console.error("Lỗi khi tải thông tin:", err);
            setMessage("Lỗi khi tải thông tin người dùng: " + err.message);
        }
    };

    const fetchListings = async () => {
        if (!userId) {
            console.error("User ID is missing. Please log in.");
            return;
        }
        try {
            const data = await SellerService.getListingsByUserId(userId);
            console.log("API Response - Number of properties:", data.properties);
            console.log("API Response - Number of listings:", data.listings);
            const mappedListings = data.listings.map((listing) => {
                const property = data.properties.find((prop) => String(prop.propertyID) === String(listing.propertyId)) || {};
                return { ...listing, property };
            });
            setListings(mappedListings);
            console.log("Total mapped listings:", mappedListings.length);
        } catch (error) {
            console.error("Failed to fetch listings:", error);
        }
    };

    useEffect(() => {
        if (!userId) return;
        fetchListings();
        fetchProfile();
        setLoading(false);
    }, [userId]);


    return (
        <>
            <Navbar />
            <div className="agent-details-wrapper">
                <div className="agent-details-container">
                    <Link to="/" className="back-link">
                        Back to Home
                    </Link>
                    <div className="agent-header">
                        <img
                            src={profile?.imgPath || profile?.ImgPath || DefaultAvatar}
                            alt={`${profile?.firstName || "Unknown"} ${profile?.lastName || "Agent"}`}
                            className="agent-details-image"
                            loading="lazy"
                        />
                        {profile && (
                            <div className="agent-info">
                                <h2 className="agent-details-name">
                                    {`${profile.firstName || "Unknown"} ${profile.lastName || "Agent"}`}
                                </h2>
                                <p className="agent-details-role">Real Estate Agent</p>
                                <p className="agent-details-sales">
                                    Over $
                                    {(listings.length > 0
                                            ? listings.reduce((sum, p) => {
                                            const price = parsePrice(p.property?.price || "0");
                                            return isNaN(price) ? sum : sum + price;
                                        }, 0) / 1000
                                            : 0
                                    ).toFixed(2)}
                                    M in properties owned
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="agent-content">
                        <section className="properties-sold">
                            <h3>Properties Owned</h3>
                            {listings.length === 0 ? (
                                <p>No properties found for this agent.</p>
                            ) : (
                                <div className="properties-grid">
                                    {listings.map((listing) => (
                                        <Link
                                            to={`/property/${listing.property.propertyID}`}
                                            key={listing.property.propertyID}
                                            className="property-card"
                                        >
                                            <div className="image-wrapper">
                                                <img
                                                    src={listing.property.imgURL || "/fallback.jpg"}
                                                    alt={listing.property.addressLine1}
                                                />
                                                <div className="badges">
                                                    <span
                                                        className={`badge ${
                                                            listing.property.purpose === "buy"
                                                                ? "for-sale"
                                                                : "for-rent"
                                                        }`}
                                                    >
                                                        {listing.property.purpose === "buy"
                                                            ? "FOR SALE"
                                                            : "FOR RENT"}
                                                    </span>
                                                </div>
                                                <div className="property-detail-info-overlay">
                                                    <h3>{listing.property.addressLine1}</h3>
                                                    <p
                                                        title={[
                                                            listing.property.addressLine1,
                                                            listing.property.addressLine2,
                                                            listing.property.region,
                                                            listing.property.city,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ")}
                                                    >
                                                        <FaMapMarkerAlt />{" "}
                                                        {truncate(
                                                            [
                                                                listing.property.addressLine1,
                                                                listing.property.addressLine2,
                                                                listing.property.region,
                                                                listing.property.city,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(", "),
                                                            30
                                                        )}
                                                    </p>
                                                    <strong>{listing.property.price}</strong>
                                                    <div className="property-info">
                                                        <span>
                                                            <FaBed /> {listing.property.numBedroom || 0}
                                                        </span>
                                                        <span>
                                                            <FaBath /> {listing.property.numBathroom || 0}
                                                        </span>
                                                        <span>
                                                            <FaExpand /> {listing.property.area || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>
                        <section className="customer-comments">
                            <h3>Customer Comments</h3>
                            <p>No comments available. (API integration needed)</p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AgentDetails;