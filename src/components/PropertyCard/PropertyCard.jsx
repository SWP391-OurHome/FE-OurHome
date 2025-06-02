import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img src={property.image} alt={property.title} />
            <h3>{property.title}</h3>
            <p>{property.type}</p>
            <p>{property.price}</p>
            <span className="location">{property.location}</span>
        </div>
    );
};

export default PropertyCard;
