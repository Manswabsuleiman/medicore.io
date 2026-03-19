import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogIn, AlertCircle } from "lucide-react";

const images = [
  "/Pictures/doctor3.png",
  "/Pictures/doctor2.png",
  "/Pictures/doctor1.png",
];

const departmentRoutes = {
  Diagnostics: "/diagnostics",
  Cardiology: "/cardiology",
  Dental: "/dental",
  Pulmonary: "/pulmonary",
  Laboratory: "/laboratory",
};

const Homepage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width <= 768;

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.department) {
      alert("Please fill in all required fields.");
      return;
    }
    const route = departmentRoutes[formData.department];
    if (route) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate(route);
      }, 6500);
    }
  };

  // --- STYLES ---
  const hangingBoxStyle = {
    position: isMobile ? "relative" : "absolute",
    bottom: isMobile ? "0" : "-130px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "92%",
    maxWidth: "1150px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    padding: isMobile ? "25px" : "40px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "30px",
    zIndex: 10,
    marginTop: isMobile ? "20px" : "0",
  };

  const formGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
    gap: "15px",
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f9", overflowX: "hidden" }}>
      
      {login && <LoginModal setLogin={setLogin} />}

      <section style={{ position: "relative", width: "100%", height: isMobile ? "75vh" : "85vh" }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Doctor"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(60%)", opacity: index === currentIndex ? 1 : 0, transition: "opacity 1s ease-in-out",
            }}
          />
        ))}

        <div style={heroOverlayStyle(isMobile)}>
          <h2 style={{ color: "#fff", fontSize: isMobile ? "28px" : "56px", fontWeight: "bold", maxWidth: "800px" }}>
            Multidisciplinary Medical Center in Kenya
          </h2>
          <button onClick={() => setLogin(true)} style={heroButtonStyle}>Book a Consultation</button>
        </div>

        <div style={hangingBoxStyle}>
          <div style={{ flex: "1" }}>
            <div style={statItemStyle}><div style={iconCircleStyle}>❤️</div><p style={statTextStyle}>150K Happy Clients</p></div>
            <div style={statItemStyle}><div style={iconCircleStyle}>💻</div><p style={statTextStyle}>Modern Tech</p></div>
          </div>

          <div style={{ flex: "2" }}>
            <h4 style={{ color: "#e91e63", marginBottom: "15px", fontWeight: "bold", fontSize: "14px" }}>
              LOOKING FOR QUALITY MEDICAL SERVICES?
            </h4>

            <form onSubmit={handleSubmit} style={formGridStyle}>
              <input type="text" name="name" placeholder="Name *" onChange={handleChange} style={inputStyle} required />
              <input type="email" name="email" placeholder="Email *" onChange={handleChange} style={inputStyle} required />
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} style={inputStyle} />
              <input type="date" name="date" onChange={handleChange} style={inputStyle} required />
              
              {/* RESTORED ALL DEPARTMENTS */}
              <select 
                name="department" 
                value={formData.department}
                onChange={handleChange} 
                style={{...inputStyle, gridColumn: isMobile ? "span 1" : "span 2"}} 
                required
              >
                <option value="">Department</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dental">Dental</option>
                <option value="Pulmonary">Pulmonary</option>
                <option value="Laboratory">Laboratory</option>
              </select>

              <button type="submit" disabled={loading} style={submitButtonStyle(isMobile, loading)}>
                {loading ? "Processing..." : "BOOK AN APPOINTMENT NOW"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div style={{ height: isMobile ? "100px" : "250px" }}></div>
    </div>
  );
};

const heroOverlayStyle = (isMobile) => ({
  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 2,
  padding: "20px", paddingBottom: isMobile ? "50px" : "120px"
});

const submitButtonStyle = (isMobile, loading) => ({
  backgroundColor: "#6c4cff", color: "#fff", border: "none", borderRadius: "6px",
  fontWeight: "bold", padding: "14px", gridColumn: isMobile ? "span 1" : "span 2",
  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
});

const inputStyle = { padding: "14px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", backgroundColor: "#f9f9f9", width: "100%" };
const heroButtonStyle = { backgroundColor: "#6c4cff", color: "#fff", padding: "15px 30px", border: "none", borderRadius: "30px", fontWeight: "bold", cursor: "pointer" };
const statItemStyle = { display: "flex", alignItems: "center", marginBottom: "20px" };
const iconCircleStyle = { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#1a3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" };
const statTextStyle = { margin: 0, fontWeight: "600", color: "#333" };

const LoginModal = ({ setLogin }) => (
  <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setLogin(false)}>
    <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "15px", maxWidth: "400px", width: "90%", textAlign: "center" }} onClick={e => e.stopPropagation()}>
      <AlertCircle size={48} color="#6c4cff" style={{ marginBottom: "15px" }} />
      <h3>Access Restricted</h3>
      <p style={{ color: "#666", marginBottom: "20px" }}>Please log in to manage your appointments.</p>
      <button onClick={() => setLogin(false)} style={{ background: "#6c4cff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>Close</button>
    </div>
  </div>
);

export default Homepage;