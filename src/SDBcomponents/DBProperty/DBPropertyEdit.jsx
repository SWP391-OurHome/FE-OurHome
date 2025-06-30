import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProperty, updateProperty } from "../../services/propertyService";
import "./DBPropertyDetails.css"; // Dùng lại style

function DBPropertyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [newImages, setNewImages] = useState([]); // For new image uploads
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching property:", id);
        const data = await getProperty(id);
        setProperty(data);
        console.log("Fetched property:", data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Không thể tải dữ liệu.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const imageToRemove = property.images[index];
      setProperty((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setRemovedImages((prev) => [...prev, imageToRemove]);
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
    console.log("Removed image. Existing images:", property.images, "New images:", newImages, "Removed images:", removedImages);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      // Append property data
      Object.keys(property).forEach((key) => {
        if (key === "images") {
          property[key].forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });
        } else {
          formData.append(key, property[key]);
        }
      });
      // Append new images
      newImages.forEach((image, index) => {
        formData.append(`newImages[${index}]`, image);
      });
      // Append removed images
      removedImages.forEach((image, index) => {
        formData.append(`removedImages[${index}]`, image);
      });

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await updateProperty(id, formData);
      alert("Cập nhật thành công!");
      navigate(-1);
    } catch (err) {
      alert(err.message || "Có lỗi khi lưu dữ liệu!");
      console.error("Error saving property:", err);
    }
    setSaving(false);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!property) return <div>Không tìm thấy property</div>;

  return (
      <div className="db-property-details">
        <div className="db-breadcrumb">
          <Link to="/dashboard">Home</Link>
          <span className="db-breadcrumb-separator">></span>
          <Link to="/dashboard/property">Property Management</Link>
          <span className="db-breadcrumb-separator">></span>
          <span>Edit Property</span>
        </div>
        <h2>Edit Property Information</h2>
        <form onSubmit={handleSave} className="db-property-edit-form" encType="multipart/form-data">
          <div className="details-grid">
            <div>
              <label>Address Line 1:</label>
              <input
                  type="text"
                  name="addressLine1"
                  value={property.addressLine1 || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Address Line 2:</label>
              <input
                  type="text"
                  name="addressLine2"
                  value={property.addressLine2 || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Region:</label>
              <input
                  type="text"
                  name="region"
                  value={property.region || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>City:</label>
              <input
                  type="text"
                  name="city"
                  value={property.city || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Property Type:</label>
              <input
                  type="text"
                  name="type"
                  value={property.type || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Purpose:</label>
              <select
                  name="purpose"
                  value={property.purpose || ""}
                  onChange={handleChange}
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
                  value={property.area || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                  type="text"
                  name="price"
                  value={property.price || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Bedrooms:</label>
              <input
                  type="number"
                  name="bedrooms"
                  value={property.bedrooms || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Bathrooms:</label>
              <input
                  type="number"
                  name="bathrooms"
                  value={property.bathrooms || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Floor:</label>
              <input
                  type="text"
                  name="floor"
                  value={property.floor || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Private Pool:</label>
              <select
                  name="privatePool"
                  value={property.privatePool ? "true" : "false"}
                  onChange={(e) =>
                      handleChange({
                        target: {
                          name: "privatePool",
                          value: e.target.value === "true",
                        },
                      })
                  }
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
                  value={property.landType || ""}
                  onChange={handleChange}
              />
            </div>
            <div>
              <label>Legal Status:</label>
              <input
                  type="text"
                  name="legalStatus"
                  value={property.legalStatus || ""}
                  onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Gallery Section */}
          <div style={{ marginTop: 24 }}>
            <label>Image Gallery:</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {property.images &&
                  property.images.map((img, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                            src={img}
                            alt={`Gallery ${index}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index, true)}
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
              {newImages.map((img, index) => (
                  <div key={`new-${index}`} style={{ position: "relative" }}>
                    <img
                        src={URL.createObjectURL(img)}
                        alt={`New ${index}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <button
                        type="button"
                        onClick={() => removeImage(index, false)}
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
                value={property.description || ""}
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
              {saving ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
  );
}

export default DBPropertyEdit;