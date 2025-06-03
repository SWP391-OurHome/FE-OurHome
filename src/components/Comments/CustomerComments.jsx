import React from "react";
import "./CustomerComments.css";
import testpicture from "../../Assets/testpicture.jpg";

const comments = [
    {
        name: "Anna Pham",
        role: "Customer",
        comment:
            "The platform made it easy to find and rent an apartment quickly. Great experience!",
        avatar: testpicture,
    },
    {
        name: "Nguyen Van Binh",
        role: "Seller",
        comment:
            "I posted my property and received several serious inquiries within 2 days.",
        avatar: testpicture,
    },
    {
        name: "Trang Le",
        role: "Customer",
        comment:
            "Clear listings and responsive sellers. I highly recommend this website!",
        avatar: testpicture,
    },
];

const CustomerComments = () => {
    return (
        <div className="comments-section">
            <h2>What People Say About Us</h2>
            <div className="comments-grid">
                {comments.map((cmt, index) => (
                    <div key={index} className="comment-card">
                        <img src={cmt.avatar} alt={cmt.name} />
                        <p className="comment-text">"{cmt.comment}"</p>
                        <div className="comment-author">
                            <strong>{cmt.name}</strong>
                            <span>{cmt.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerComments;
