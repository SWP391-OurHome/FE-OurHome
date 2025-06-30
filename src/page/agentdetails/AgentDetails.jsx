import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navigation/Header";
import Footer from "../../components/Footer/Footer";
import "./AgentDetails.css";

const agents = [
    {
        name: "John Powell",
        role: "Real Estate Agent",
        image: "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?w=600&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
        sales: "Over $5M in properties sold",
        propertiesSold: [
            { id: 1, name: "Luxury Villa", price: "$1,200,000", date: "Jan 2025" },
            { id: 2, name: "Downtown Apartment", price: "$800,000", date: "Dec 2024" },
        ],
        customerComments: [
            { id: 1, name: "Alice Brown", comment: "John was professional and helped us find our dream home!", rating: 5 },
            { id: 2, name: "Mark Lee", comment: "Great service, highly recommend!", rating: 4 },
        ],
    },
    {
        name: "Thomas Powell",
        role: "Property Consultant",
        image: "https://plus.unsplash.com/premium_photo-1666866587910-2f333c109ef7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
        sales: "Over $3M in properties sold",
        propertiesSold: [
            { id: 1, name: "Beachfront Condo", price: "$950,000", date: "Feb 2025" },
        ],
        customerComments: [
            { id: 1, name: "Sarah Kim", comment: "Thomas was very knowledgeable and patient.", rating: 5 },
        ],
    },
    {
        name: "Tom Wilson",
        role: "Sales Specialist",
        image: "https://images.unsplash.com/photo-1618224884150-56e42a997a4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
        sales: "Over $2M in properties sold",
        propertiesSold: [
            { id: 1, name: "Suburban House", price: "$600,000", date: "Mar 2025" },
            { id: 2, name: "City Loft", price: "$700,000", date: "Nov 2024" },
        ],
        customerComments: [
            { id: 1, name: "Emma Davis", comment: "Tom made the process smooth and stress-free.", rating: 5 },
        ],
    },
    {
        name: "Samuel Palmer",
        role: "Marketing & Client Relations",
        image: "https://images.unsplash.com/photo-1700317440795-4f52d9364783?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh1bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
        sales: "Over $1.5M in properties sold",
        propertiesSold: [
            { id: 1, name: "Countryside Cottage", price: "$450,000", date: "Apr 2025" },
        ],
        customerComments: [
            { id: 1, name: "Liam Johnson", comment: "Samuel was very responsive and helpful.", rating: 4 },
        ],
    },
];

const AgentDetails = () => {
    const { agentId } = useParams();
    const agent = agents.find((a) => a.name.replace(/\s+/g, "-").toLowerCase() === agentId);

    if (!agent) {
        return (
            <>
                <Navbar />
                <div className="agent-details-wrapper">
                    <div className="agent-details-container">
                        <h2>Agent Not Found</h2>
                        <Link to="/agent" className="back-link">
                            Back to Agents
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="agent-details-wrapper">
                <div className="agent-details-container">
                    <Link to="/agents" className="back-link">
                        Back to Agents
                    </Link>
                    <div className="agent-header">
                        <img
                            src={agent.image}
                            alt={agent.name}
                            className="agent-details-image"
                            loading="lazy"
                        />
                        <div className="agent-info">
                            <h2 className="agent-details-name">{agent.name}</h2>
                            <p className="agent-details-role">{agent.role}</p>
                            <p className="agent-details-sales">{agent.sales}</p>
                        </div>
                    </div>
                    <div className="agent-content">
                        <section className="properties-sold">
                            <h3>Properties Sold</h3>
                            {agent.propertiesSold.length > 0 ? (
                                <ul className="properties-list">
                                    {agent.propertiesSold.map((property) => (
                                        <li key={property.id} className="property-item">
                                            <span>{property.name}</span>
                                            <span>{property.price}</span>
                                            <span>{property.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No properties sold yet.</p>
                            )}
                        </section>
                        <section className="customer-comments">
                            <h3>Customer Comments</h3>
                            {agent.customerComments.length > 0 ? (
                                <ul className="comments-list">
                                    {agent.customerComments.map((comment) => (
                                        <li key={comment.id} className="comment-item">
                                            <p className="comment-name">{comment.name}</p>
                                            <p className="comment-text">{comment.comment}</p>
                                            <p className="comment-rating">
                                                Rating: {"★".repeat(comment.rating)}
                                                {"☆".repeat(5 - comment.rating)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AgentDetails;