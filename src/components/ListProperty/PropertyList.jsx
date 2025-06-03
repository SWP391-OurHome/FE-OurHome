import React, { useState } from "react";
import "./PropertyList.css";
import PropertyCard from "../PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import testpicture from "../../Assets/testpicture.jpg";

const properties = [
    // RENT
    {
        id: 1,
        title: "Modern Apartment with Sea View",
        location: "Đà Nẵng",
        price: "8 million/month",
        image: testpicture,
        type: "Apartment",
        purpose: "rent",
    },
    {
        id: 2,
        title: "Luxury Villa near My Khe Beach",
        location: "Đà Nẵng",
        price: "25 million/month",
        image: testpicture,
        type: "Villa",
        purpose: "rent",
    },
    // SALE
    {
        id: 3,
        title: "3BR House in Hoa Xuan, Cam Le",
        location: "Đà Nẵng",
        price: "2.8 billion VND",
        image: testpicture,
        type: "House",
        purpose: "buy",
    },
    {
        id: 4,
        title: "Beachside Land Plot – Ngu Hanh Son",
        location: "Đà Nẵng",
        price: "3.5 billion VND",
        image: testpicture,
        type: "Land",
        purpose: "buy",
    },
    {
        id: 5,
        title: "Penthouse Apartment – Ocean View",
        location: "Đà Nẵng",
        price: "6.2 billion VND",
        image: testpicture,
        type: "Apartment",
        purpose: "buy",
    },
];

const PropertyList = () => {
    const [selectedPurpose, setSelectedPurpose] = useState("buy");

    const filteredProperties = properties.filter(
        (p) => p.location === "Đà Nẵng" && p.purpose === selectedPurpose
    );

    return (
        <div className="property-wrapper">
            <h2>Properties in Đà Nẵng</h2>
            <div className="filter-buttons">
                <button
                    className={selectedPurpose === "buy" ? "active" : ""}
                    onClick={() => setSelectedPurpose("buy")}
                >
                    <i className="bi bi-house"></i>For Sale
                </button>
                <button
                    className={selectedPurpose === "rent" ? "active" : ""}
                    onClick={() => setSelectedPurpose("rent")}
                >
                    <i className="bi bi-file-earmark-fill"></i> For Rent
                </button>
            </div>
            <div className="property-grid">
                {filteredProperties.length === 0 ? (
                    <p>No properties found.</p>
                ) : (
                    filteredProperties.map((property) => (
                        <Link to={`/property/${property.id}`} key={property.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <PropertyCard property={property} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyList;