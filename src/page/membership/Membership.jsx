import React from 'react';
import Navbar from '../../components/Navigation/Header';
import Footer from '../../components/Footer/Footer';
import './Membership.css';

const Membership = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$100/month',
      description: 'Ideal for new sellers starting their journey.',
      benefits: [
        '5 free property listings',
        'Email support',
        'Access to basic dashboard',
      ],
      color: 'linear-gradient(135deg, #f7e4e1, #fff)',
    },
    {
      name: 'Advanced',
      price: '$400/month',
      description: 'Optimized for professional sellers with enhanced features.',
      benefits: [
        '20 free property listings',
        'Email and chat support',
        'Advanced dashboard',
        'Featured listing once a month',
      ],
      color: 'linear-gradient(135deg, #e1f0e1, #fff)',
    },
    {
      name: 'Premium',
      price: '$800/month',
      description: 'Comprehensive solution for large businesses.',
      benefits: [
        'Unlimited property listings',
        '24/7 phone support',
        'Detailed analytics and reports',
        'Featured listing weekly',
        'Exclusive advertising',
      ],
      color: 'linear-gradient(135deg, #e1e8f0, #fff)',
    },
  ];

  const faqs = [
    {
      question: 'How do I register for a membership plan?',
      answer: 'Click on "Choose Plan" and follow the simple payment instructions.',
    },
    {
      question: 'Is there a refund available?',
      answer: 'No refunds are available after the first 7 days unless under special circumstances.',
    },
    {
      question: 'How can I upgrade my plan?',
      answer: 'Go to your account section and select "Upgrade Plan" to change immediately.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="membership-container">
        {/* Banner */}
        <div className="banner">
          <h1>Discover Membership Plans</h1>
          <p>Elevate your real estate business with us today!</p>
        </div>

        {/* Membership Plans */}
        <div className="plans-section">
          <h2>Your Membership Plans</h2>
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div key={index} className="plan-card" style={{ background: plan.color }}>
                <div className="plan-header">
                  <h3>{plan.name}</h3>
                  <span className="plan-price">{plan.price}</span>
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-benefits">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>
                      <span className="check-mark">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
                <button className="plan-button" onClick={() => alert(`You have selected the ${plan.name} plan`)}>Choose Plan</button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;