import React from "react";

// Import các components theo thư mục của bạn
import Navbar from '../../components/Navigation/Header';
import Banner from '../../components/Banner/Banner';
import Agents from '../../components/Agents/Agents';
import CustomerComments from '../../components/Comments/CustomerComments';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/ChatBot/chatbot';
import PropertyList from '../../components/ListProperty/PropertyList';


const HomePage = () => {
    return (
        <>
            {/* Header Navigation */}
            <Navbar />

            {/* Hero Banner Section */}
            <Banner />

            {/* Property List (with sale/rent filter) */}
            <PropertyList />

            {/* Agent showcase */}
            <Agents />

            {/* Customer testimonials */}
            <CustomerComments />

            {/* Chatbot fixed button */}
            <Chatbot />

            {/* Footer */}
            <Footer />
        </>
    );
};

export default HomePage;
