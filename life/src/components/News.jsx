import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MedicoreFooter from "./Footer";

const News = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const scrollRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const newsData = [
    {
      id: 1,
      title: "New AI-Driven Diagnostics for COPD",
      date: "Oct 24, 2025",
      author: "Admin",
      category: "Technology",
      short: "Medicore.io introduces AI imaging to detect early-stage COPD with 98% accuracy.",
      full: "Our facility has officially integrated the latest AI-driven diagnostic tools. This technology allows our pulmonologists to analyze HRCT scans in seconds, identifying microscopic obstructions that were previously difficult to detect. This leads to earlier intervention and significantly better patient outcomes.",
      img: "/Pictures/who.png",
    },
    {
      id: 2,
      title: "Top Rated Respiratory Center in Kenya",
      date: "Nov 12, 2025",
      author: "Medical Board",
      category: "Awards",
      short: "We are proud to be ranked as the #1 Pulmonary center for patient satisfaction this year.",
      full: "For the third year running, Medicore.io has been recognized by the National Healthcare Board. Our commitment to 'Specialized Pulmonary Care' and our 24/7 emergency oxygen support systems have set a new benchmark for clinics in Kenya.",
      img: "/Pictures/respiration.png",
    },
    {
      id: 3,
      title: "Advanced Asthma Research Trials",
      date: "Dec 05, 2025",
      author: "Dr. B. Pneuma",
      category: "Research",
      short: "Participate in our upcoming clinical trials for next-gen inhaler technology.",
      full: "We are opening doors for patients to join our Phase III clinical trials. These trials focus on long-acting bronchodilators that require only once-weekly administration, potentially revolutionizing the way asthma is managed globally.",
      img: "/Pictures/asthma.png",
    },
    {
      id: 4,
      title: "Expansion: New Pediatric Wing",
      date: "Jan 10, 2026",
      author: "Management",
      category: "Facility",
      short: "Our hospital is growing! A dedicated pediatric pulmonary wing opens next month.",
      full: "To better serve our younger patients, we are opening a specialized wing designed for children with chronic respiratory issues. It features child-friendly diagnostic rooms and a team of top-tier pediatric pulmonologists.",
      img: "/Pictures/pediatrics.png",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = isMobile ? clientWidth : 380;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        style={{
          padding: isMobile ? "60px 0" : "100px 0",
          backgroundColor: "#f4f7fa",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflowX: "hidden"
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              marginBottom: isMobile ? "30px" : "50px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "20px" : "0"
            }}
          >
            <div>
              <h5
                style={{
                  color: "#d63384",
                  margin: 0,
                  letterSpacing: "2px",
                  fontSize: "12px",
                }}
              >
                LATEST UPDATES
              </h5>
              <h2
                style={{
                  color: "#1a3a8a",
                  fontSize: isMobile ? "28px" : "36px",
                  margin: "10px 0 0 0",
                  fontWeight: "800",
                }}
              >
                Hospital News
              </h2>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => scroll("left")} style={arrowBtnStyle}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll("right")} style={arrowBtnStyle}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: isMobile ? "20px" : "30px",
              paddingBottom: "20px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: isMobile ? "x mandatory" : "none"
            }}
          >
            {newsData.map((item) => (
              <div 
                key={item.id} 
                style={{
                  ...cardStyle,
                  flex: isMobile ? "0 0 100%" : "0 0 350px",
                  scrollSnapAlign: "center"
                }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div style={{ padding: isMobile ? "20px" : "25px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      fontSize: "11px",
                      color: "#888",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={metaIconStyle}><Calendar size={12} /> {item.date}</span>
                    <span style={metaIconStyle}><User size={12} /> {item.author}</span>
                  </div>

                  <h4 style={{ color: "#1a3a8a", fontSize: "18px", margin: "0 0 15px 0", lineHeight: "1.4" }}>
                    {item.title}
                  </h4>

                  <p style={{ color: "#666", fontSize: "13px", marginBottom: "20px", lineHeight: "1.6" }}>
                    {item.short}
                  </p>

                  <button
                    onClick={() => setSelectedNews(item)}
                    style={readMoreBtn}
                  >
                    READ MORE <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedNews && (
          <div style={modalOverlayStyle} onClick={() => setSelectedNews(null)}>
            <div 
              style={{
                ...modalContentStyle,
                width: isMobile ? "95%" : "90%",
                padding: isMobile ? "20px" : "40px"
              }} 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedNews(null)}
                style={{
                  ...closeBtnStyle,
                  top: isMobile ? "10px" : "20px",
                  right: isMobile ? "10px" : "20px"
                }}
              >
                <X size={isMobile ? 20 : 24} />
              </button>

              <img
                src={selectedNews.img}
                alt=""
                style={{
                  width: "100%",
                  height: isMobile ? "200px" : "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <div style={{ padding: isMobile ? "20px 0" : "30px 0" }}>
                <span
                  style={{
                    backgroundColor: "#ffe3ee",
                    color: "#d63384",
                    padding: "5px 12px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "bold",
                  }}
                >
                  {selectedNews.category}
                </span>

                <h2 style={{ color: "#1a3a8a", marginTop: "15px", fontSize: isMobile ? "22px" : "28px" }}>
                  {selectedNews.title}
                </h2>

                <p style={{ color: "#666", lineHeight: "1.7", fontSize: isMobile ? "14px" : "15px" }}>
                  {selectedNews.full}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <MedicoreFooter />
    </>
  );
};


const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  border: "1px solid #eee",
  boxSizing: "border-box"
};

const metaIconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const arrowBtnStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid #1a3a8a",
  backgroundColor: "#fff",
  color: "#1a3a8a",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const readMoreBtn = {
  background: "none",
  border: "none",
  color: "#d63384",
  fontWeight: "700",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "20px"
};

const modalContentStyle = {
  backgroundColor: "#fff",
  maxWidth: "700px",
  borderRadius: "20px",
  position: "relative",
  maxHeight: "90vh",
  overflowY: "auto",
};

const closeBtnStyle = {
  position: "absolute",
  background: "white",
  border: "none",
  borderRadius: "50%",
  padding: "5px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  color: "#333",
  zIndex: 10
};

export default News;
