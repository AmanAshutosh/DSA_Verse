import React, { useState } from "react";
import "./Login.css";
import Toast from "../UI/Toast";
import Footer from "../UI/Footer";


export default function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [toast, setToast] = useState("");

 const handleSubmit = (e) => {
   e.preventDefault();

   if (!/^[a-zA-Z ]+$/.test(name)) {
     setToast("Name should contain only letters");
     return;
   }

   if (!/^[0-9]{10}$/.test(phone)) {
     setToast("Phone must be exactly 10 digits");
     return;
   }

   setLoading(true); // 🔥 start loading

   setTimeout(() => {
     const user = { name, phone };
     localStorage.setItem("dsa-user", JSON.stringify(user));
     onLogin(user);
   }, 1000); // simulate delay
 };

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">DSA Verse</h1>
        <p className="login__subtitle">Start your DSA journey</p>

        <form onSubmit={handleSubmit} className="login__form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
      <Toast message={toast} show={!!toast} onClose={() => setToast("")} />
      <Footer />
    </div>
  );
}
