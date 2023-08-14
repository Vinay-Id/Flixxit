
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import {  useDispatch } from "react-redux";
import { membership } from "../slices/movieSlice";
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const plans = {
    monthly: {
      name: "Monthly Plan",
      price: 99,
    },
    yearly: {
      name: "Yearly Plan",
      price: 999,
    },
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  const dispatch= useDispatch()
  const handlePayNow = () => {

    dispatch(membership())
    toast.success(`Payment successful for ${plans[selectedPlan].name}`);
    navigate("/profile");
  };
  
  return (
    <div className="payment-page">
      <div className="payment-container">
      <h2>Choose a Subscription Plan</h2>
      <div className="plan-options">
        {Object.keys(plans).map((plan) => (
          <div
            key={plan}
            className={`plan ${selectedPlan === plan ? "selected" : ""}`}
            onClick={() => handlePlanChange(plan)}
          >
            <h3>{plans[plan].name}</h3>
            <p>₹{plans[plan].price.toFixed(2)} / month</p>
          </div>
        ))}
      </div>
      <div className="invoice">
        <h3>Invoice Summary</h3>
        <p>Subscription: {plans[selectedPlan].name}</p>
        <p>Total Amount: ₹{plans[selectedPlan].price.toFixed(2)}</p>
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
      </div>
    </div>
  );
};

export default PaymentPage;
