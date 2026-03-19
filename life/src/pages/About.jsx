import React, { useState, useEffect } from "react";
import {
  Users,
  Award,
  ShieldCheck,
  Stethoscope,
  Activity,
} from "lucide-react";
import MedicoreFooter from "../components/Footer";

const AboutSection = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const styles = {
    section: {
      padding: isMobile ? "40px 20px" : "80px 20px",
      backgroundColor: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      overflowX: "hidden"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      // Switch to 1 column on mobile
      gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
      gap: isMobile ? "40px" : "60px",
      alignItems: "center",
    },
    imageContainer: {
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.1)",
      order: isTablet ? 2 : 1, // Move image below text on tablet/mobile if desired
    },
    imagePlaceholder: {
      width: "100%",
      height: isMobile ? "300px" : "500px",
      backgroundColor: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "cover",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#eff6ff",
      color: "#3b82f6",
      padding: "8px 16px",
      borderRadius: "99px",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    title: {
      fontSize: isMobile ? "28px" : "42px",
      color: "#0f172a",
      fontWeight: "800",
      lineHeight: "1.2",
      marginBottom: "24px",
    },
    description: {
      fontSize: isMobile ? "16px" : "18px",
      color: "#475569",
      lineHeight: "1.7",
      marginBottom: "32px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: windowWidth < 480 ? "1fr" : "1fr 1fr",
      gap: "24px",
      marginBottom: "40px",
    },
    feature: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    featureTitle: {
      fontWeight: "700",
      color: "#0f172a",
      fontSize: "16px",
    },
    featureText: {
      fontSize: "14px",
      color: "#64748b",
    },
  };

  return (
    <>
      <section style={styles.section}>
        <div style={styles.container}>
          {/* IMAGE SECTION */}
          <div style={styles.imageContainer}>
            <img
              src="/Pictures/about.png"
              alt="Medicore Medical Team"
              style={styles.imagePlaceholder}
              onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=About+Medicore"; }}
            />

            <div
              style={{
                position: "absolute",
                bottom: isMobile ? "15px" : "30px",
                right: isMobile ? "15px" : "30px",
                backgroundColor: "#3b82f6",
                color: "white",
                padding: isMobile ? "12px" : "20px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: "800" }}>5+</div>
              <div
                style={{
                  fontSize: isMobile ? "10px" : "12px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Years Excellence
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div style={{ order: isTablet ? 1 : 2 }}>
            <div style={styles.badge}>
              <Activity size={16} />
              About Medicore.io
            </div>

            <h2 style={styles.title}>
              Compassionate Care <br />
              <span style={{ color: "#3b82f6" }}>
                Meet Modern Innovation.
              </span>
            </h2>

            <p style={styles.description}>
              At Medicore.io, we believe healthcare should be as personal as it
              is professional. Founded in 2001, our facility has grown from a
              local clinic into a world-class medical center, integrating
              advanced AI diagnostics with a human-first approach.
            </p>

            <div style={styles.grid}>
              <div style={styles.feature}>
                <Award color="#3b82f6" size={24} />
                <div style={styles.featureTitle}>Top-Ranked Experts</div>
                <div style={styles.featureText}>
                  Board-certified specialists across 40+ departments.
                </div>
              </div>

              <div style={styles.feature}>
                <ShieldCheck color="#3b82f6" size={24} />
                <div style={styles.featureTitle}>Safety First</div>
                <div style={styles.featureText}>
                  HIPAA compliant and state-of-the-art sterilization.
                </div>
              </div>

              <div style={styles.feature}>
                <Stethoscope color="#3b82f6" size={24} />
                <div style={styles.featureTitle}>24/7 Support</div>
                <div style={styles.featureText}>
                  On-call emergency services and digital telehealth.
                </div>
              </div>

              <div style={styles.feature}>
                <Users color="#3b82f6" size={24} />
                <div style={styles.featureTitle}>Patient Portals</div>
                <div style={styles.featureText}>
                  Instant access to your records and lab results.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MedicoreFooter />

    </>
  );
};

export default AboutSection;