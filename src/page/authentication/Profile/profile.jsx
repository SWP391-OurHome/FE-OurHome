import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./profile.css"; // CSS file for styling
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Footer/Footer";

const ProfileView = () => {
  const [profile, setProfile] = useState({
    userID: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    birthday: "1985-03-15",
    imgPath: "/images/john_doe.jpg",
    roleID: 3,
  });

  const [formData, setFormData] = useState(profile);

  // Trạng thái ẩn/hiện các phần chỉnh sửa
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePersonalInfoSave = () => {
    setProfile(formData);
    setIsEditingBasicInfo(false);
  };

  const handleEmailSave = () => {
    setProfile({ ...profile, email: formData.email });
    setIsEditingEmail(false);
  };

  const handlePhoneSave = () => {
    setProfile({ ...profile, phone: formData.phone });
    setIsEditingPhone(false);
  };

  return (
      <>
        <Header />
        <div
            style={{
              minHeight: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff"
            }}
        >
          <div className="profile-container">
            <div className="profile-header">
              <button
                  className="edit-btn"
                  onClick={() => {
                    setIsEditingBasicInfo(true);
                    setIsEditingEmail(false);
                    setIsEditingPhone(false);
                  }} // Show basic info editing
              >
                Edit Profile Information
              </button>
              <button
                  className="edit-btn"
                  onClick={() => {
                    setIsEditingEmail(true);
                    setIsEditingBasicInfo(false);
                    setIsEditingPhone(false);
                  }} // Show email editing
              >
                Change Email
              </button>
              <button
                  className="edit-btn"
                  onClick={() => {
                    setIsEditingPhone(true);
                    setIsEditingBasicInfo(false);
                    setIsEditingEmail(false);
                  }} // Show phone editing
              >
                Change Phone
              </button>
            </div>

            {/* Đóng gói tất cả các phần trong 1 div bao quanh để dễ dàng kiểm soát */}
            <div className="profile-edit-wrapper">
              {/* Phần chỉnh sửa thông tin cơ bản */}
              <div className="profile-details">
                <div className="profile-image">
                  <img src={formData.imgPath} alt="Profile" />
                </div>
                <div className="profile-info">
                  {isEditingBasicInfo ? (
                      <>
                        <p>
                          <strong>First Name:</strong>
                          <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                          />
                        </p>
                        <p>
                          <strong>Last Name:</strong>
                          <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                          />
                        </p>
                        <p>
                          <strong>Birthday:</strong>
                          <input
                              type="date"
                              name="birthday"
                              value={formData.birthday}
                              onChange={handleChange}
                          />
                        </p>
                        <button onClick={handlePersonalInfoSave}>Save Basic Info</button>
                      </>
                  ) : (
                      <>
                        <p><strong>First Name:</strong> {formData.firstName}</p>
                        <p><strong>Last Name:</strong> {formData.lastName}</p>
                        <p><strong>Birthday:</strong> {formData.birthday}</p>
                      </>
                  )}
                </div>
              </div>

              {/* Phần chỉnh sửa email */}
              {isEditingEmail && (
                  <div className="profile-edit-email show">
                    <p>
                      <strong>New Email:</strong>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                      />
                    </p>
                    <button onClick={handleEmailSave}>Save Email</button>
                  </div>
              )}

              {/* Phần chỉnh sửa phone */}
              {isEditingPhone && (
                  <div className="profile-edit-phone show">
                    <p>
                      <strong>New Phone:</strong>
                      <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                      />
                    </p>
                    <button onClick={handlePhoneSave}>Save Phone</button>
                  </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
  );
};

export default ProfileView;
