import React, { useState, useEffect } from "react";
import MedicoreFooter from "../components/Footer";

const MedicalBlog = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const s = {
    container: {
      backgroundColor: "#f4f7fe",
      padding: isMobile ? "20px 15px" : isTablet ? "40px 5%" : "40px 10%",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: isTablet ? "column" : "row",
      gap: "30px",
      color: "#444",
    },
    mainContent: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    sidebar: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      padding: isMobile ? "15px" : "20px",
    },
    blogImg: {
      width: "100%",
      height: isMobile ? "250px" : "400px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    tag: {
      backgroundColor: "#2ecc71",
      color: "#fff",
      padding: "5px 12px",
      borderRadius: "5px",
      fontSize: "11px",
      display: "inline-block",
      marginBottom: "15px",
    },
    meta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px 15px",
      fontSize: isMobile ? "11px" : "13px",
      color: "#888",
      marginBottom: "15px",
      borderBottom: "1px solid #eee",
      paddingBottom: "10px",
    },
    title: {
      fontSize: isMobile ? "18px" : "22px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "10px",
      lineHeight: "1.4",
    },
    excerpt: {
      fontSize: "14px",
      color: "#7f8c8d",
      lineHeight: "1.6",
      marginBottom: "15px",
    },
    readMore: {
      color: "#3498db",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
    },
    widgetTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      position: "relative",
      paddingBottom: "10px",
    },
    searchBar: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #e0e6ed",
      backgroundColor: "#eef2f7",
      outline: "none",
      boxSizing: "border-box"
    },
    recentPost: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
    },
    rpImg: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      objectFit: "cover",
      flexShrink: 0
    },
    categoryItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px dashed #ddd",
      fontSize: "14px",
      color: "#555",
    },
  };

  const BlogCard = ({ img, tag, title }) => (
    <div style={s.card}>
      <div style={{ position: "relative" }}>
        <img src={img} alt="medical" style={s.blogImg} />
        <span
          style={{
            ...s.tag,
            position: "absolute",
            bottom: "25px",
            left: "15px",
          }}
        >
          {tag}
        </span>
      </div>

      <div style={s.meta}>
        <span>👤 Admin</span>
        <span>📅 Jan 09, 2023</span>
        <span>💬 05</span>
        <span style={{ display: isMobile ? "none" : "inline" }}>👁️ 1,526 VIEWS</span>
      </div>

      <div style={s.title}>{title}</div>

      <div style={s.excerpt}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </div>

      <div style={s.readMore}>Read More →</div>
    </div>
  );

  return (
    <>
      <div style={s.container}>
        {/* LEFT COLUMN */}
        <div style={s.mainContent}>
          <BlogCard
            img="/Pictures/doc.png"
            tag="Doctor Checking"
            title="Doctor Checking Old Retired Woman Heart Related Problems During Pandemic"
          />

          <BlogCard
            img="/Pictures/respiration.png"
            tag="X-Ray Sitting"
            title="Doctor And Patients Looking At X-Ray Sitting In Medical Office"
          />
        </div>

        {/* SIDEBAR */}
        <div style={s.sidebar}>
          {/* Search */}
          <div style={s.card}>
            <div style={s.widgetTitle}>Search</div>
            <div style={{ position: "relative" }}>
              <input type="text" placeholder="Search..." style={s.searchBar} />
              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "12px",
                  color: "#3498db",
                }}
              >
                🔍
              </span>
            </div>
          </div>

          {/* About Us */}
          <div style={s.card}>
            <div style={s.widgetTitle}>About Us</div>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <img
                src="/Pictures/logy1.png"
                alt="Dr"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "8px",
                  flexShrink: 0
                }}
              />
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>Dr. Brandon</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "3px",
                  }}
                >
                  Endocrinology
                </div>
                <p style={{ fontSize: "11px", color: "#777", margin: 0 }}>
                  Specialist in hormonal health and metabolic care.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div style={s.card}>
            <div style={s.widgetTitle}>Recent Post</div>
            {[
              {
                t: "Nurse Measuring Patient Blood Pressure",
                d: "08 Jan 2023",
                i: "/Pictures/who.png",
              },
              {
                t: "Team Young Specialist Doctors Standing",
                d: "08 Jan 2023",
                i: "/Pictures/doctors.png",
              },
            ].map((post, i) => (
              <div key={i} style={s.recentPost}>
                <img src={post.i} style={s.rpImg} alt="post" />
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "3px",
                    }}
                  >
                    {post.t}
                  </div>
                  <div style={{ fontSize: "11px", color: "#aaa" }}>
                    📅 {post.d}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div style={s.card}>
            <div style={s.widgetTitle}>Popular Categories</div>
            {[
              { n: "Cardiology", c: 33 },
              { n: "Dentist", c: 23 },
              { n: "Geriatrics", c: 13 },
              { n: "Health Care", c: 10 },
            ].map((cat, i) => (
              <div key={i} style={s.categoryItem}>
                <span>{cat.n}</span>
                <span style={{ color: "#aaa" }}>({cat.c})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

            <MedicoreFooter/>

    </>
  );
};

export default MedicalBlog;
