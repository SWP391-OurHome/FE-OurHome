import React, { useState } from "react";
import "./Banner.css";
import bannerImage from "../../Assets/Banner.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css';

const HeroSection = () => {
    const [form, setForm] = useState({
        purpose: "buy",
        type: "",
        price: "",
        area: "",
        keyword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            purpose: "buy",
            type: "",
            price: "",
            area: "",
            keyword: "",
        });
    };

    const handleSearch = () => {
        console.log("Searching with:", form);
    };

    return (
        <div
            className="hero-container"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="hero-content">
                <div className="hero-text">
                    <h1>We rent your property</h1>
                    <p>
                        Find the perfect property for your needs. Discover rentals and real estate listings with ease and confidence.
                    </p>
                </div>

                <div className="search-box">
                    <div className="tabs">
                        <button
                            className={form.purpose === "buy" ? "active" : ""}
                            onClick={() => setForm({ ...form, purpose: "buy" })}
                        >
                            Buy
                        </button>
                        <button
                            className={form.purpose === "rent" ? "active" : ""}
                            onClick={() => setForm({ ...form, purpose: "rent" })}
                        >
                            Rent
                        </button>
                    </div>

                    <div className="filters">
                        <input
                            type="text"
                            name="keyword"
                            placeholder="Search by keyword"
                            value={form.keyword}
                            onChange={handleChange}
                        />
                        <select name="type" value={form.type} onChange={handleChange}>
                            <option value="">Property Type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="villa">PentHouse</option>
                            <option value="villa">Land</option>
                        </select>
                        <select name="price" value={form.price} onChange={handleChange}>
                            <option value="">Price Range</option>
                            {form.purpose === "rent" ? (
                                <>
                                    <option value="under5">Under 5 million</option>
                                    <option value="5to10">5 – 10 million</option>
                                    <option value="10to20">10 – 20 million</option>
                                    <option value="over20">Over 20 million</option>
                                </>
                            ) : (
                                <>
                                    <option value="under1b">Under 1 billion</option>
                                    <option value="1to3b">1 – 3 billion</option>
                                    <option value="3to5b">3 – 5 billion</option>
                                    <option value="over5b">Over 5 billion</option>
                                </>
                            )}
                        </select>
                        <select name="area" value={form.area} onChange={handleChange}>
                            <option value="">Area</option>
                            <option value="under30">Under 30m²</option>
                            <option value="30to60">30–60m²</option>
                            <option value="60to100">60–100m²</option>
                            <option value="over100">Over 100m²</option>
                        </select>
                        <button className="search-btn" onClick={handleSearch}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;