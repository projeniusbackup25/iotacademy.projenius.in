import React, { useState } from "react";
import "./PaymentPage.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import axios from "axios";

const pricing = {
  beginner: { title: "Beginner IoT Workshop", price: 1, original: 999 },
  intermediate: { title: "Intermediate IoT Workshop", price: 999, original: 1999 },
  advanced: { title: "Advanced AI-IoT Workshop", price: 1499, original: 2999 },
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const { level } = useParams();
  const data = pricing[level];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmails = async (password) => {
    const adminParams = {
      name: form.name,
      phone: form.phone,
      workshop: data.title,
      email: form.email,
    };

    const userParams = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      workshop: data.title,
      password,
    };

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID_PAYMENT,
      process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE,
      adminParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY_PAYMENT
    );

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID_PAYMENT,
      process.env.REACT_APP_EMAILJS_USER_TEMPLATE,
      userParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY_PAYMENT
    );
  };

  const startRazorpay = () => {
    const options = {
      key: "rzp_live_RN6p5rIDsUaFfK",
      amount: data.price * 100,
      currency: "INR",
      name: "ProJenius",
      description: data.title,

      handler: async function (response) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/payment/success`,
            {
              name: form.name,
              email: form.email,
              phone: form.phone,
              workshopKit: level,
              paymentId: response.razorpay_payment_id,
              amount: data.price,
            }
          );

          await sendEmails(res.data.generatedPassword);
          setShowSuccess(true);
        } catch (err) {
          console.error(err);
          alert("Something went wrong while processing your order.");
        }
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: { color: "#6366f1" },
    };

    new window.Razorpay(options).open();
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      startRazorpay();
    }, 3000);
  };

  return (
    <section className="payment-wrapper">
      <div className="payment-header">
        <h2>
          Unlock Your <span>Learning Journey</span>
        </h2>
        <p>Get full access to all lessons, projects, and certification.</p>
      </div>

      <div className="payment-grid">
        {/* Student Details */}
        <div className="payment-card">
          {!loading ? (
            <>
              <h3>🎓 Student Details</h3>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <button className="pay-btn" onClick={handleSubmit}>
                <FaLock /> Complete Purchase
              </button>

              <small>🔒 Secure & Safe Payment</small>
            </>
          ) : (
            <div className="vehicle-loader">
              <div className="road"></div>
              <div className="car">
                <div className="body"></div>
                <div className="wheel left"></div>
                <div className="wheel right"></div>
              </div>
              <p>Processing your order...</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="payment-card summary">
          <h3>✨ Order Summary</h3>

          <div className="summary-top">
            <p>{data.title}</p>
            <span>₹{data.price}</span>
          </div>

          <ul>
            <li><FaCheckCircle /> 15+ Video Lessons</li>
            <li><FaCheckCircle /> 10+ Hands-on Projects</li>
            <li><FaCheckCircle /> PDF Manuals & Guides</li>
            <li><FaCheckCircle /> Certificate of Completion</li>
            <li><FaCheckCircle /> Lifetime Access</li>
          </ul>

          <div className="summary-total">
            <div>
              <span>Subtotal</span>
              <span>₹{data.original}</span>
            </div>
            <div className="discount">
              <span>Discount</span>
              <span>-₹{data.original - data.price}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>₹{data.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <FaCheckCircle className="success-icon" />
            <h2>Payment Successful 🎉</h2>
            <p>
              Your account has been created successfully.<br />
              Login credentials have been sent to your email.
            </p>
           
<button onClick={() => navigate("/")}>
  Continue
</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentPage;
