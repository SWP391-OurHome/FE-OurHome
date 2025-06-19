import React, { useState, useEffect } from "react";
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Footer/Footer";
import {
    getUserInformation,
    updateUserInformation,
    updateAvatarProfile,
} from "../../../services/cusomerService"; // sửa lại đúng tên
import "./profile.css";


const BASE_URL = "http://localhost:8082";


const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        imgPath: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [message, setMessage] = useState("");


    // Lấy userID từ localStorage bằng if/else
    let userID = null;
    const stored = localStorage.getItem("user");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // ép kiểu Number và kiểm tra
            const idNum = Number(parsed.id);
            if (Number.isInteger(idNum) && idNum > 0) {
                userID = idNum;
                console.log("userID:", userID);
            } else {
                console.error("ID người dùng không hợp lệ trong localStorage:", parsed.id);
            }
        } catch (err) {
            console.error("Dữ liệu user trong localStorage không hợp lệ:", err);
        }
    } else {
        console.warn("Không tìm thấy key ‘user’ trong localStorage");
    }


    // 1. Trong fetchProfile, sau khi setProfile và setFormData, lưu về localStorage:
    const fetchProfile = async (id) => {
        setMessage("");
        try {
            const data = await getUserInformation(id);
            console.log("Server trả về:", data);
            setProfile(data);
            setFormData({
                firstName: data.firstName || "",
                lastName:  data.lastName  || "",
                email:     data.email     || "",
                phone:     data.phone     || "",
                birthday:  data.birthday  || "",
                imgPath:   data.imgPath   || data.ImgPath || "",
            });


            // **LƯU VỀ localStorage**
            localStorage.setItem("user", JSON.stringify({
                id:        id,
                firstName: data.firstName,
                lastName:  data.lastName,
                email:     data.email,
                phone:     data.phone,
                birthday:  data.birthday,
                picture:   data.imgPath || data.ImgPath || ""
            }));
            window.dispatchEvent(new Event("userInfoChanged"));
        } catch (err) {
            console.error("Lỗi khi tải thông tin:", err);
            setMessage("Lỗi khi tải thông tin người dùng: " + err.message);
        }
    };




    // --- 2. Gọi fetchProfile ngay khi component mount ---
    useEffect(() => {
        if (!userID) {
            setMessage("ID người dùng không hợp lệ hoặc không tìm thấy.");
            return;
        }
        // show tạm data cũ từ localStorage (nếu muốn)
        // rồi fetch bản mới nhất từ server:
        fetchProfile(userID);
    }, [userID]);


    // --- 3. Các handler ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setImageFile(file);
            setFormData((prev) => ({
                ...prev,
                imgPath: URL.createObjectURL(file),
            }));
        }
    };


    // --- 4. Update profile info ---
    // 2. Trong updateProfileInfo, sau khi cập nhật thành công, cũng ghi lại toàn bộ user:
    const updateProfileInfo = async () => {
        if (!profile) {
            setMessage("Không tìm thấy thông tin profile.");
            return false;
        }
        setMessage("");


        const userDTO = {
            firstName: formData.firstName,
            lastName:  formData.lastName,
            birthday:  formData.birthday,
            email:     formData.email,
            phone:     formData.phone,
            imgPath:   formData.imgPath,
        };


        const res = await updateUserInformation(userID, userDTO);
        if (!res.success) {
            setMessage(res.message);
            return false;
        }


        // cập nhật state
        setProfile(prev => ({ ...prev, ...userDTO }));
        setMessage("Cập nhật thông tin thành công 🎉");


        // **LƯU VỀ localStorage**
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                const usr = JSON.parse(stored);
                // ghi đè các field mới
                usr.firstName = userDTO.firstName;
                usr.lastName  = userDTO.lastName;
                usr.email     = userDTO.email;
                usr.phone     = userDTO.phone;
                usr.birthday  = userDTO.birthday;
                usr.picture   = userDTO.imgPath;
                localStorage.setItem("user", JSON.stringify(usr));
                window.dispatchEvent(new Event("userInfoChanged"));
            } catch (e) {
                console.error("Không thể cập nhật localStorage:", e);
            }
        }


        return true;
    };


    // --- 5. Update avatar ---
    const updateAvatar = async () => {
        if (!profile) {
            setMessage("Không tìm thấy thông tin profile.");
            return false;
        }
        if (!imageFile) {
            setMessage("Vui lòng chọn file avatar.");
            return false;
        }


        // validate loại file
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(imageFile.type)) {
            setMessage("Chỉ cho phép JPEG, PNG, GIF.");
            return false;
        }
        if (imageFile.size > 5 * 1024 * 1024) {
            setMessage("File quá lớn (>5MB).");
            return false;
        }


        setMessage("");
        const fd = new FormData();
        fd.append("avatar", imageFile);


        try {
            const res = await updateAvatarProfile(userID, fd);
            if (!res.success) {
                setMessage(res.message);
                return false;
            }


            // build URL đầy đủ
            const url = res.avatarUrl?.startsWith("http")
                ? res.avatarUrl
                : BASE_URL + res.avatarUrl;


            // 1) Cập nhật state
            setFormData(prev => ({ ...prev, imgPath: url }));
            setProfile(prev => ({ ...prev, imgPath: url }));
            setMessage("Cập nhật avatar thành công 🎉");


            // 2) Lưu vào localStorage
            const stored = localStorage.getItem("user");
            if (stored) {
                try {
                    const usr = JSON.parse(stored);
                    usr.picture = url;            // hoặc usr.imgPath = url nếu bạn lưu key khác
                    localStorage.setItem("user", JSON.stringify(usr));
                } catch (e) {
                    console.error("Không thể cập nhật localStorage:", e);
                }
            }


            // 3) (Tùy chọn) Dispatch event để component khác lắng nghe
            window.dispatchEvent(new Event("avatarChanged"));
            window.dispatchEvent(new Event("userInfoChanged"));
            return true;
        } catch (err) {
            console.error("Lỗi khi cập nhật avatar:", err);
            setMessage(err.message || "Lỗi khi cập nhật avatar.");
            return false;
        }
    };


    // --- 6. Save all changes ---
    const handleSaveChanges = async () => {
        let ok = false;
        if (isEditingBasicInfo || isEditingEmail || isEditingPhone) {
            ok = await updateProfileInfo();
            if (!ok) return;
        }
        if (imageFile) {
            ok = await updateAvatar();
            if (!ok) return;
        }
        if (ok) {
            setIsEditingBasicInfo(false);
            setIsEditingEmail(false);
            setIsEditingPhone(false);
            setImageFile(null);
        }
    };


    // --- Guard nếu chưa có profile ---
    if (!profile) {
        return (
            <div className="pv-loading">
                {message || "Đang tải thông tin người dùng..."}
            </div>
        );
    }


    return (
        <>
            <Header />
            <div className="pv-profile-page">
                <div className="pv-profile-container">
                    <div className="pv-profile-header">
                        <button
                            className="pv-edit-btn"
                            onClick={() => {
                                setIsEditingBasicInfo(true);
                                setIsEditingEmail(false);
                                setIsEditingPhone(false);
                            }}
                        >
                            Edit Profile Info
                        </button>
                        <button
                            className="pv-edit-btn"
                            onClick={() => {
                                setIsEditingEmail(true);
                                setIsEditingBasicInfo(false);
                                setIsEditingPhone(false);
                            }}
                        >
                            Change Email
                        </button>
                        <button
                            className="pv-edit-btn"
                            onClick={() => {
                                setIsEditingPhone(true);
                                setIsEditingBasicInfo(false);
                                setIsEditingEmail(false);
                            }}
                        >
                            Change Phone
                        </button>
                        <button className="pv-save-btn-main" onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                    </div>


                    <div className="pv-edit-wrapper">
                        {/* Avatar */}
                        <div className="pv-details-section">
                            <div className="pv-image-wrapper pv-image-upload">
                                {formData.imgPath ? (
                                    <img
                                        src={formData.imgPath}
                                        alt="Profile"
                                        className="pv-image-preview"
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                ) : (
                                    <div>Không có ảnh đại diện</div>
                                )}
                                <label className="edit-overlay">
                                    <i className="icon-pencil" /> Edit
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>


                            {/* Basic Info */}
                            <div className="pv-info-section">
                                {isEditingBasicInfo ? (
                                    <>
                                        <div className="pv-field-row">
                                            <label className="pv-label">First Name:</label>
                                            <input
                                                className="pv-input"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="pv-field-row">
                                            <label className="pv-label">Last Name:</label>
                                            <input
                                                className="pv-input"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="pv-field-row">
                                            <label className="pv-label">Birthday:</label>
                                            <input
                                                className="pv-input"
                                                type="date"
                                                name="birthday"
                                                value={formData.birthday}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="pv-display-row">
                                            <span className="pv-label">First Name:</span>{" "}
                                            {profile.firstName}
                                        </div>
                                        <div className="pv-display-row">
                                            <span className="pv-label">Last Name:</span>{" "}
                                            {profile.lastName}
                                        </div>
                                        <div className="pv-display-row">
                                            <span className="pv-label">Birthday:</span>{" "}
                                            {profile.birthday}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>


                        {/* Email */}
                        {isEditingEmail && (
                            <div className="pv-email-section pv-section-show">
                                <div className="pv-field-row">
                                    <label className="pv-label">New Email:</label>
                                    <input
                                        className="pv-input"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}


                        {/* Phone */}
                        {isEditingPhone && (
                            <div className="pv-phone-section pv-section-show">
                                <div className="pv-field-row">
                                    <label className="pv-label">New Phone:</label>
                                    <input
                                        className="pv-input"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}


                        {message && <p className="pv-message">{message}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};


export default ProfileView;

