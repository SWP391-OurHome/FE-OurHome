import React, { useState } from "react";
import "./chatbot.css";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => setOpen(!open);

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { from: "user", text: input }]);
        setInput("");
        // You can add API call or simple mock response here
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Thank you! We'll get back to you soon." },
            ]);
        }, 500);
    };

    return (
        <div className="chatbot-container">
            <button className="chat-toggle-btn" onClick={toggleChat}>
                💬
            </button>

            {open && (
                <div className="chatbox">
                    <div className="chat-header">
                        <strong>Support Chat</strong>
                        <button onClick={toggleChat}>✖</button>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
