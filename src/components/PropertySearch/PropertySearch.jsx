import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaBath, FaBed, FaExpand, FaMapMarkerAlt } from "react-icons/fa";
import "./PropertySearch.css";

export default function PropertySearch() {
  const navigate = useNavigate();
  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      city: params.get("city") || "",
      propertyType: params.get("propertyType") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      minArea: params.get("minArea") || "",
      maxArea: params.get("maxArea") || "",
      bedrooms: params.get("bedrooms") || "",
      bathrooms: params.get("bathrooms") || "",
    };
    setFilters(newFilters);

    setLoading(true);
    axios
      .get("http://localhost:8082/api/listing/search", { params: newFilters })
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading data: " + err.message);
        setLoading(false);
      });
  }, [location.search]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`?${params.toString()}`);
  };

  return (
    <section className="search-featured-section">
      <div className="search-form">
        <div className="search-form-grid">
          <h2>Search Properties</h2>
          <input
            name="city"
            placeholder="Address"
            value={filters.city}
            onChange={handleChange}
          />
          <input
            name="propertyType"
            placeholder="Property Type"
            value={filters.propertyType}
            onChange={handleChange}
          />
          <input
            name="minPrice"
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
          />
          <input
            name="minArea"
            type="number"
            placeholder="Min Area (m²)"
            value={filters.minArea}
            onChange={handleChange}
          />
          <input
            name="maxArea"
            type="number"
            placeholder="Max Area (m²)"
            value={filters.maxArea}
            onChange={handleChange}
          />
          <input
            name="bedrooms"
            type="number"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          />
          <input
            name="bathrooms"
            type="number"
            placeholder="Bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {loading ? (
        <div className="search-loading">Loading...</div>
      ) : error ? (
        <div className="search-error">{error}</div>
      ) : (
        <div className="search-properties-grid">
          {properties.map((item) => (
            <Link
              to={`/property/${item.propertyID || item.propertyId}`}
              key={item.propertyID || item.propertyId}
              className="search-property-card"
            >
              <div className="search-image-wrapper">
                <img
                  src={item.imgURL || "/fallback.jpg"}
                  alt={item.addressLine1}
                />
                <div className="search-badges">
                  <span
                    className={`search-badge ${
                      item.purpose === "buy"
                        ? "search-for-sale"
                        : "search-for-rent"
                    }`}
                  >
                    {item.purpose === "buy" ? "FOR SALE" : "FOR RENT"}
                  </span>
                  {item.isFeatured && (
                    <span className="search-badge search-featured">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="search-property-detail-info-overlay">
                  <h3>{item.addressLine1}</h3>
                  <p>
                    <FaMapMarkerAlt /> {item.addressLine1}, {item.city}
                  </p>
                  <strong>${item.price}</strong>
                  <div className="search-property-info">
                    <span>
                      <FaBed /> {item.numBedroom}
                    </span>
                    <span>
                      <FaBath /> {item.numBathroom}
                    </span>
                    <span>
                      <FaExpand /> {item.area} m²
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
