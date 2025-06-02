import React from "react";
import "./Agents.css";
import AgentCard from "./AgentCard";

const agents = [
    {
        name: "John Doe",
        title: "Real Estate Agent",
        phone: "0123 456 789",
        email: "john@example.com",
        image: "/agents/agent1.jpg", // đổi theo đúng đường dẫn ảnh thật
    },
    {
        name: "Emma Smith",
        title: "Property Consultant",
        phone: "0987 654 321",
        email: "emma@example.com",
        image: "/agents/agent2.jpg",
    },
    {
        name: "David Lee",
        title: "Luxury Property Specialist",
        phone: "0111 222 333",
        email: "david@example.com",
        image: "/agents/agent3.jpg",
    },
];

const AgentList = () => {
    return (
        <div className="agent-section">
            <h2>Our Trusted Agents</h2>
            <div className="agent-grid">
                {agents.map((agent, index) => (
                    <AgentCard key={index} agent={agent} />
                ))}
            </div>
        </div>
    );
};

export default AgentList;
