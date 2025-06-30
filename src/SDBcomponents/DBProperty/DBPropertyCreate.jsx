import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProperty } from "../../services/propertyService";
import "./DBPropertyDetails.css";

function DBPropertyCreate() {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        addressLine1: "",
        addressLine2: "",
        region: "",
        city: "",
        type: "",
        purpose: "",
        area: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        floor: "",
        privatePool: "false",
        landType: "",
        legalStatus: "",
        description: "",
        images: [],
    });
    const [newImages, setNewImages] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Retrieve userID from localStorage, assuming it's stored as a JSON object under "user"
    const userData = localStorage.getItem("user");
    const userID = userData ? JSON.parse(userData).id : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prev) => ({
            ...prev,
            [name]: name === "privatePool" ? value : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        console.log("Removed image. New images:", newImages);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (!userID) {
                throw new Error("User ID is missing. Please log in.");
            }

            const formData = new FormData();
            Object.keys(property).forEach((key) => {
                if (key !== "images") {
                    formData.append(key, property[key]);
                }
            });
            newImages.forEach((image) => {
                formData.append("images", image);
            });

            console.log("user id:", userID);
            console.log("Request URL:", `${process.env.REACT_APP_API_URL}/listing/${userID}`);
            console.log("FormData entries:");

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            await createProperty(userID, formData);
            alert("Tạo bài đăng thành công!");
            navigate("/dashboard/property");
        } catch (err) {
            const errorMessage = err.message || "Có lỗi khi tạo bài đăng!";
            console.error("Error creating property:", err);
            alert(errorMessage);
            setError(errorMessage);
        }
        setSaving(false);
    };

    return (
        <div className="db-property-details">
            <div className="db-breadcrumb">
                <Link to="/dashboard">Home</Link>
                <span className="db-breadcrumb-separator">></span>
                <Link to="/dashboard/property">Property Management</Link>
                <span className="db-breadcrumb-separator">></span>
                <span>Create Property</span>
            </div>
            <h2>Create New Property</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <form onSubmit={handleSave} className="db-property-edit-form" encType="multipart/form-data">
                <div className="details-grid">
                    <div>
                        <label>Address Line 1:</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={property.addressLine1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Address Line 2:</label>
                        <input
                            type="text"
                            name="addressLine2"
                            value={property.addressLine2}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Region:</label>
                        <input
                            type="text"
                            name="region"
                            value={property.region}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={property.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Property Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={property.type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Purpose:</label>
                        <select
                            name="purpose"
                            value={property.purpose}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select purpose</option>
                            <option value="rent">For Rent</option>
                            <option value="sale">For Sale</option>
                        </select>
                    </div>
                    <div>
                        <label>Area (m²):</label>
                        <input
                            type="number"
                            name="area"
                            value={property.area}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={property.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Bedrooms:</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={property.bedrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Bathrooms:</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={property.bathrooms}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Floor:</label>
                        <input
                            type="text"
                            name="floor"
                            value={property.floor}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Private Pool:</label>
                        <select
                            name="privatePool"
                            value={property.privatePool}
                            onChange={handleChange}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div>
                        <label>Land Type:</label>
                        <input
                            type="text"
                            name="landType"
                            value={property.landType}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Legal Status:</label>
                        <input
                            type="text"
                            name="legalStatus"
                            value={property.legalStatus}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ marginTop: 24 }}>
                    <label>Image Gallery:</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                        {newImages.map((img, index) => (
                            <div key={`new-${index}`} style={{ position: "relative" }}>
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`New ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ marginTop: "16px" }}
                    />
                </div>

                <div style={{ marginTop: 24 }}>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: "100%" }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 16,
                        marginTop: 32,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={{
                            padding: "12px 32px",
                            borderRadius: 12,
                            border: "1px solid #ccc",
                            background: "#fff",
                            color: "#222",
                            fontWeight: 500,
                            fontSize: 18,
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: "12px 32px",
                            borderRadius: 12,
                            background: "#a259ff",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 18,
                            border: "none",
                        }}
                        disabled={saving}
                    >
                        {saving ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DBPropertyCreate;