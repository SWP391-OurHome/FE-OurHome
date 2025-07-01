
import React, { useState } from 'react';
import './PaymentForm.css';
import PayOSIntegration from '../PayOSIntegration/PayOSIntegration';
import { toast } from 'react-toastify';
import { CheckCircle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentFormPremium = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const amount = 100;
    const [paymentUrl, setPaymentUrl] = useState('');
    const membershipType = 'PREMIUM';

    const handlePaymentSuccess = (url) => {
        setPaymentUrl(url);
        toast.success('Payment initiated successfully! Please complete the payment.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'custom-toast',
        });
    };

    return (
        <div className="payment-form-container">
            <div className="payment-form card shadow-sm p-4">
                <h2 className="text-center mb-4 text-primary">Payment for Premium Plan</h2>
                <div className="row g-3">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label className="form-label">Amount (VND)</label>
                            <p className="text-info fw-bold mb-0">{amount} (*100 = {amount * 100} VND)</p>
                            <small className="text-muted">Amount is fixed for Premium plan</small>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <PayOSIntegration name={name} email={email} amount={amount} membershipType={membershipType} onSuccess={handlePaymentSuccess} />
                </div>
                <div className="text-center mt-3">
                    <div className="row">
                        <div className="col-12 mb-1">
                            <p className="text-muted">
                                Name: <span className="text-info fw-bold">{name || 'Not specified'}</span> |
                                Email: <span className="text-info fw-bold">{email || 'Not specified'}</span>
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="text-muted">
                                Amount: <span className="text-info fw-bold">{amount} (*100 = {amount * 100} VND)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFormPremium;

