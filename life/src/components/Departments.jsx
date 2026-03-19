import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024 && windowWidth > 768;

  const containerStyle = {
    textAlign: "center",
    padding: isMobile ? "40px 10px" : "60px 20px",
    backgroundColor: "#fff",
  };

  const departmentsWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: isMobile ? "10px" : "30px",
    gap: isMobile ? "10px" : "20px",
  };

  const departmentItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: isMobile ? "10px" : "20px",
    width: isMobile ? "45%" : isTablet ? "30%" : "200px", 
  };

  const imageStyle = {
    width: isMobile ? "100px" : "130px",
    height: isMobile ? "100px" : "130px",
    borderRadius: "50%",
    cursor: "pointer",
    objectFit: "cover",
    marginBottom: "15px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "4px solid #f6f4ff",
  };

  const titleStyle = {
    fontSize: isMobile ? "16px" : "20px",
    color: "#333",
    fontWeight: "600",
    marginTop: "0",
  };

  const departmentData = [
    { name: "Diagnostics", path: "/diagnostics", img: "/Pictures/diagnostics.png" },
    { name: "Cardiology", path: "/cardiology", img: "/Pictures/card.png" },
    { name: "Dental", path: "/dental", img: "/Pictures/Dental.png" },
    { name: "Pulmonary", path: "/pulmonary", img: "/Pictures/pulmonary.png" },
    { name: "Laboratory", path: "/laboratory", img: "/Pictures/hosp.png" },
  ];

  return (
    <div style={containerStyle}>
      
      <style>
        {`
          .dept-img:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 20px rgba(108, 76, 207, 0.2);
            border-color: #6c4ccf !important;
          }
        `}
      </style>

      <h2 style={{ 
        color: "#6c4ccf", 
        fontSize: isMobile ? "28px" : "36px",
        marginBottom: "10px" 
      }}>
        Our <span style={{ color: "#000" }}>Departments</span>
      </h2>
      <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto 20px" }}>
        Specialized medical care tailored to your needs.
      </p>

      <div style={departmentsWrapperStyle}>
        {departmentData.map((dept, index) => (
          <div key={index} style={departmentItemStyle}>
            <img
              className="dept-img"
              onClick={() => navigate(dept.path)}
              src={dept.img}
              alt={dept.name}
              style={imageStyle}
            />
            <h3 style={titleStyle}>{dept.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
