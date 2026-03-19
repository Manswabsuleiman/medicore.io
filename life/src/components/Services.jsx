import React, { useState, useEffect } from "react";

const Services = () => {
  // ================= STATES =================
  const [activeDept, setActiveDept] = useState("All");
  const [openServiceId, setOpenServiceId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // ================= RESPONSIVENESS LISTENER =================
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;
  const currentHour = new Date().getHours();

  // ================= DATA =================
  const services = [
    {
      id: 1,
      name: "Emergency Care",
      department: "Emergency",
      priority: 3,
      open: 0,
      close: 24,
      description: "Immediate medical attention for life-threatening conditions.",
    },
    {
      id: 2,
      name: "Cardiology",
      department: "Cardiology",
      priority: 2,
      open: 8,
      close: 18,
      description: "Heart-related diagnosis, treatment, and long-term care services.",
    },
    {
      id: 3,
      name: "Diagnostics & Imaging",
      department: "Diagnostics",
      priority: 2,
      open: 7,
      close: 20,
      description: "Advanced laboratory tests and medical imaging services.",
    },
    {
      id: 4,
      name: "Surgical Services",
      department: "Surgery",
      priority: 1,
      open: 9,
      close: 17,
      description: "General and specialized surgical procedures by expert surgeons.",
    },
    {
      id: 5,
      name: "Physiotherapy & Rehab",
      department: "Rehabilitation",
      priority: 1,
      open: 8,
      close: 16,
      description: "Recovery-focused therapy to restore movement and strength.",
    },
  ];

  const filteredServices = services
    .filter((s) => activeDept === "All" || s.department === activeDept)
    .sort((a, b) => b.priority - a.priority);

  const isServiceOpen = (service) =>
    currentHour >= service.open && currentHour < service.close;
  const containerStyle = {
    display: "flex",
    flexDirection: isTablet ? "column" : "row",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: isMobile ? "20px" : "40px",
    padding: isMobile ? "0 20px" : "0 40px",
    boxSizing: "border-box", 
  };

  const imageWrapStyle = {
    flex: 1,
    borderRadius: "16px",
    overflow: "hidden",
    height: isMobile ? "250px" : isTablet ? "400px" : "auto",
    width: "100%",
  };

  const cardStyle = {
    flex: 1,
    background: "#fff",
    borderRadius: "16px",
    padding: isMobile ? "25px" : "35px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ 
      width: "100%", 
      padding: isMobile ? "40px 0" : "80px 0", 
      background: "#fff",
      overflowX: "hidden", 
      boxSizing: "border-box"
    }}>
      
      <h2 style={{ 
        textAlign: "center", 
        fontSize: isMobile ? "26px" : "32px", 
        fontWeight: "700", 
        marginBottom: "30px", 
        color: "#1a3a8a",
        padding: "0 10px"
      }}>
        Our Other Services
      </h2>

      {/* FILTER BUTTONS */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: isMobile ? "30px" : "50px",
        padding: "0 15px",
        maxWidth: "100%",
        boxSizing: "border-box"
      }}>
        {["All", "Emergency", "Cardiology", "Diagnostics", "Surgery", "Rehabilitation"].map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            style={{
              padding: isMobile ? "8px 12px" : "10px 16px",
              borderRadius: "20px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: isMobile ? "12px" : "14px",
              background: activeDept === dept ? "#1a3a8a" : "#f1f4ff",
              color: activeDept === dept ? "#fff" : "#1a3a8a",
              marginBottom: isMobile ? "5px" : "0"
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      <div style={containerStyle}>
        {/* LEFT IMAGE */}
        <div style={imageWrapStyle}>
          <img
            src="/Pictures/services.png"
            alt="Hospital Services"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* RIGHT CONTENT CARD */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: "24px", color: "#1a3a8a", marginBottom: "25px", marginTop: 0 }}>
            Hospital Services
          </h3>

          {filteredServices.map((service) => {
            const open = isServiceOpen(service);
            const expanded = openServiceId === service.id;

            return (
              <div key={service.id} style={{ borderBottom: "1px solid #eee", padding: "15px 0" }}>
                <div
                  onClick={() => setOpenServiceId(expanded ? null : service.id)}
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    cursor: "pointer",
                    gap: "10px" 
                  }}
                >
                  <span style={{ fontWeight: "600", fontSize: isMobile ? "14px" : "16px", color: "#333" }}>
                    {service.name}
                  </span>

                  <span style={{
                    padding: "5px 10px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    background: "#e6fff1", 
                    color: "#1a9b55",      
                  }}>
                    {open ? "Open Now" : "New Service"}
                  </span>
                </div>

                {expanded && (
                  <div style={{ marginTop: "12px", animation: "fadeIn 0.3s ease" }}>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", margin: "0 0 8px 0" }}>
                      {service.description}
                    </p>
                    <small style={{ fontSize: "12px", color: "#888", fontWeight: "500" }}>
                      Operating Hours: {service.open}:00 – {service.close}:00
                    </small>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          * { box-sizing: border-box; }
        `}
      </style>
    </div>
  );
};

export default Services;
