import React from "react";

const AgentCard = ({ agent }) => {
    return (
        <div className="agent-card">
            <img src={agent.image} alt={agent.name} />
            <h3>{agent.name}</h3>
            <p>{agent.title}</p>
            <p>📞 {agent.phone}</p>
            <p>✉️ {agent.email}</p>
            <button>Contact</button>
        </div>
    );
};

export default AgentCard;
