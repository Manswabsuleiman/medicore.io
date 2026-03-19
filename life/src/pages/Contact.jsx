import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from "lucide-react";
import MedicoreFooter from "../components/Footer";

const ContactSection = () => {
  const [status, setStatus] = useState("idle");
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      setStatus("success");
      e.target.reset(); 
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  const s = {
    section: { 
      padding: isMobile ? "40px 15px" : "60px 10%", 
      backgroundColor: "#f4f7fe", 
      fontFamily: "Segoe UI, sans-serif" 
    },
    container: { 
      display: "flex", 
      flexDirection: isTablet ? "column" : "row",
      gap: isMobile ? "30px" : "40px", 
      backgroundColor: "#fff", 
      padding: isMobile ? "25px" : "40px", 
      borderRadius: "12px", 
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      maxWidth: "1200px",
      margin: "0 auto"
    },
    infoSide: { flex: 1 },
    formSide: { flex: 1.5 },
    title: { 
      fontSize: isMobile ? "24px" : "28px", 
      color: "#2c3e50", 
      fontWeight: "bold", 
      marginBottom: "10px",
      textAlign: isTablet ? "center" : "left"
    },
    subtitle: { 
      fontSize: "14px", 
      color: "#7f8c8d", 
      marginBottom: "30px", 
      lineHeight: "1.6",
      textAlign: isTablet ? "center" : "left"
    },
    infoItem: { 
      display: "flex", 
      alignItems: "center", 
      gap: "15px", 
      marginBottom: "20px",
      justifyContent: isTablet ? "flex-start" : "flex-start",
      maxWidth: isTablet ? "300px" : "100%",
      margin: isTablet ? "0 auto 20px auto" : "0 0 20px 0"
    },
    iconBox: { 
      width: "45px", 
      height: "45px", 
      backgroundColor: "#eef2f7", 
      borderRadius: "10px", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      color: "#3498db",
      flexShrink: 0
    },
    inputGroup: { 
      marginBottom: "15px", 
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      gap: "15px" 
    },
    input: { 
      width: "100%", 
      padding: "12px 15px", 
      borderRadius: "8px", 
      border: "1px solid #e1e8ed", 
      backgroundColor: "#f9fbff", 
      outline: "none", 
      fontSize: "14px", 
      boxSizing: "border-box" 
    },
    textarea: { 
      width: "100%", 
      padding: "12px 15px", 
      borderRadius: "8px", 
      border: "1px solid #e1e8ed", 
      backgroundColor: "#f9fbff", 
      outline: "none", 
      fontSize: "14px", 
      minHeight: "120px", 
      resize: "none",
      boxSizing: "border-box"
    },
    button: {
      backgroundColor: status === "submitting" ? "#95a5a6" : "#3498db",
      color: "#fff", 
      border: "none", 
      padding: "14px 30px", 
      borderRadius: "8px", 
      fontWeight: "bold",
      width: isMobile ? "100%" : "auto",
      cursor: status === "submitting" ? "not-allowed" : "pointer", 
      marginTop: "10px", 
      display: "flex", 
      justifyContent: "center",
      alignItems: "center", 
      gap: "8px", 
      transition: "0.3s"
    },
    successBox: {
      backgroundColor: "#e8f8f0", 
      color: "#27ae60", 
      padding: "15px", 
      borderRadius: "8px", 
      marginTop: "20px", 
      display: "flex", 
      alignItems: "center", 
      gap: "10px", 
      fontSize: "14px", 
      border: "1px solid #27ae60"
    }
  };

  return (
    <>
      <div style={s.section}>
        <div style={s.container}>
          {/* Left Side */}
          <div style={s.infoSide}>
            <h2 style={s.title}>Get In Touch</h2>
            <p style={s.subtitle}>Have questions about our medical services? Our team is here to help you 24/7.</p>
            
            <div style={{ display: isTablet ? "flex" : "block", flexDirection: "column" }}>
              {[
                { icon: <MapPin size={20} />, label: "Our Location", text: "Kenya, Nairobi KE" },
                { icon: <Phone size={20} />, label: "Phone Number", text: "+1 (254) 000-4123" },
                { icon: <Mail size={20} />, label: "Email Address", text: "support@medicore.io" }
              ].map((item, idx) => (
                <div key={idx} style={s.infoItem}>
                  <div style={s.iconBox}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "#7f8c8d" }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form style={s.formSide} onSubmit={handleSubmit}>
            <div style={s.inputGroup}>
              <input name="user_name" type="text" placeholder="Your Name" style={s.input} required />
              <input name="user_email" type="email" placeholder="Your Email" style={s.input} required />
            </div>
            <div style={s.inputGroup}>
              <input name="subject" type="text" placeholder="Subject" style={s.input} required />
            </div>
            <textarea name="message" placeholder="Tell us how we can help..." style={s.textarea} required />

            {status === "success" ? (
              <div style={s.successBox}>
                <CheckCircle size={20} /> 
                <span>Message sent successfully! We will contact you shortly.</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === "submitting"}
                style={s.button}
                onMouseOver={(e) => status !== "submitting" && (e.currentTarget.style.backgroundColor = "#2980b9")}
                onMouseOut={(e) => status !== "submitting" && (e.currentTarget.style.backgroundColor = "#3498db")}
              >
                {status === "submitting" ? (
                  <>Sending... <Loader2 size={16} className="spin-animation" /></>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            )}
            
            {status === "error" && (
              <div style={{ color: "#e74c3c", marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
                Submission failed. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
      <MedicoreFooter/>
      
      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ContactSection;