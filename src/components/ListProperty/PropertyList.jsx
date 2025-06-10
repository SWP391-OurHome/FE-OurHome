import React from "react";
import {
    FaBath,
    FaBed,
    FaExpand,
    FaMapMarkerAlt,
    FaHome,
} from "react-icons/fa";
import "./PropertyList.css";
import Property1 from "../../Assets/img/Property1.jpg"
import Property2 from "../../Assets/img/Property2.jpg"
import Property3 from "../../Assets/img/Property3.jpg"
import Property4 from "../../Assets/img/Property4.jpg"
import Property5 from "../../Assets/img/Property5.jpg"
import Property6 from "../../Assets/img/Property6.jpg"
const properties = [
    {
        id: 1,
        title: "Luxury Family Home",
        address: "1800-1818 79th St",
        price: "$395,000",
        badge: ["FOR SALE", "FEATURED"],
        beds: 4,
        baths: 1,
        area: 400,
        img: Property1,
    },
    {
        id: 2,
        title: "Skyper Pool Apartment",
        address: "1020 Bloomingdale Ave",
        price: "$280,000",
        badge: ["FOR SALE"],
        beds: 4,
        baths: 2,
        area: 450,
        img: Property2,
    },
    {
        id: 3,
        title: "North Dillard Street",
        address: "4330 Bell Shoals Rd",
        price: "$250/month",
        badge: ["FOR RENT"],
        beds: 4,
        baths: 2,
        area: 400,
        img: Property3,
    },
    {
        id: 4,
        title: "Eaton Garth Penthouse",
        address: "7722 18th Ave, Brooklyn",
        price: "$180,000",
        badge: ["FOR SALE", "FEATURED"],
        beds: 4,
        baths: 2,
        area: 450,
        img: Property4,
    },
    {
        id: 5,
        title: "New Apartment Nice View",
        address: "42 Avenue Q, Brooklyn",
        price: "$850/month",
        badge: ["FOR RENT", "FEATURED"],
        beds: 4,
        baths: 1,
        area: 460,
        img: Property5,
    },
    {
        id: 6,
        title: "Diamond Manor Apartment",
        address: "7802 20th Ave, Brooklyn",
        price: "$259,000",
        badge: ["FOR SALE", "FEATURED"],
        beds: 4,
        baths: 2,
        area: 500,
        img: Property6,
    },
];

const FeaturedProperties = () => {
    return (
        <section className="featured-section">
            <div className="featured-header">
                <h2 className="section-title">Featured Properties</h2>
                <p className="section-subtitle">
                    Discover top listings hand-picked for you.
                </p>
                <div className="filter-buttons">
                    <button className="active">All Properties</button>
                    <button>For Sale</button>
                    <button>For Rent</button>
                </div>
            </div>

            <div className="properties-grid">
                {properties.map((item) => (
                    <div className="property-card" key={item.id}>
                        <div className="image-wrapper">
                            <img src={item.img} alt={item.title} />
                            <div className="badges">
                                {item.badge.map((b, i) => (
                                    <span key={i} className={`badge ${b.toLowerCase().replace(" ", "-")}`}>
                                    {b}
                                  </span>
                                ))}
                            </div>
                        </div>
                        <div className="property-details">
                            <h3 className="property-title">{item.title}</h3>
                            <p className="property-address">
                                <FaMapMarkerAlt /> {item.address}
                            </p>
                            <p className="property-price">{item.price}</p>
                            <div className="property-info">
                                <span><FaBed /> {item.beds}</span>
                                <span><FaBath /> {item.baths}</span>
                                <span><FaExpand /> {item.area} sqft</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="view-all">
                <button className="view-all-btn">See All Listing →</button>
            </div>
        </section>
    );
};

export default FeaturedProperties;
