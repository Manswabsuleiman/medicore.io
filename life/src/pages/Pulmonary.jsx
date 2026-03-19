import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  Activity, 
  Thermometer, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Stethoscope
} from 'lucide-react';
import MedicoreFooter from '../components/Footer';
import Ask from '../components/Ask'; 

const Pulmonary = () => {
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const doctors = [
    { name: "Dr. Alveoli Smith", img: "./public/Pictures/pulm1.png" },
    { name: "Dr. Broncho Lee", img: "./public/Pictures/pulm2.png" },
    { name: "Dr. B. Pneuma", img: "./public/Pictures/pulm3.png" },
    { name: "Dr. Shantel Keith", img: "./public/Pictures/pulm4.png" },
  ];

  const categories = [
    {
      title: "Lung Function",
      icon: <Wind size={32} color="#6c4cff" />,
      description: "Measuring how well your lungs move air in and out.",
      tests: [
        { name: "Spirometry", price: "3,500" },
        { name: "Lung Volume Test", price: "5,000" },
        { name: "Diffusion Capacity", price: "4,500" },
      ],
    },
    {
      title: "Respiratory Imaging",
      icon: <Activity size={32} color="#6c4cff" />,
      description: "Advanced imaging to detect infections or obstructions.",
      tests: [
        { name: "Chest X-Ray", price: "2,500" },
        { name: "HRCT Thorax", price: "16,000" },
        { name: "Bronchoscopy", price: "25,000" },
      ],
    },
    {
      title: "Sleep & Oxygen",
      icon: <Thermometer size={32} color="#6c4cff" />,
      description: "Specialized monitoring for apnea and blood oxygen levels.",
      tests: [
        { name: "Sleep Study (Polysomnography)", price: "12,000" },
        { name: "Pulse Oximetry", price: "1,500" },
        { name: "Arterial Blood Gas (ABG)", price: "4,000" },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
      setTimeLeft(1800);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, doctors.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // ================= DYNAMIC STYLES =================
  const heroWrapperStyle = { 
    position: 'relative', 
    width: '100%', 
    minHeight: isMobile ? '100vh' : '85vh', 
    display: 'flex', 
    alignItems: 'center',
    padding: isMobile ? '80px 0' : '0'
  };

  const contentLayoutStyle = { 
    position: 'relative', 
    zIndex: 2, 
    width: '100%', 
    maxWidth: '1600px', 
    margin: '0 auto', 
    padding: isMobile ? '0 20px' : '0 60px', 
    display: 'flex', 
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'flex-start', 
    alignItems: 'center',
    textAlign: isMobile ? 'center' : 'left'
  };

  const cardSideContainer = { 
    position: isMobile ? 'relative' : 'absolute', 
    right: isMobile ? 'auto' : '6%', 
    top: isMobile ? 'auto' : '50%', 
    transform: isMobile ? 'none' : 'translateY(-50%)', 
    width: isMobile ? '100%' : '380px',
    maxWidth: '400px',
    marginTop: isMobile ? '40px' : '0'
  };

  const gridStyle = { 
    display: 'grid', 
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', 
    gap: '30px' 
  };

  const doctorsGridStyle = { 
    display: 'grid', 
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px, 1fr))', 
    gap: isMobile ? '15px' : '30px', 
    maxWidth: '1000px', 
    margin: '0 auto' 
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: '#fff', overflowX: 'hidden' }}>
      <style>
        {`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
          @keyframes floatEffect { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
          .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
          .reveal.active { opacity: 1; transform: translateY(0); }
          .floating-card { animation: ${isMobile ? 'none' : 'floatEffect 5s ease-in-out infinite'}; }
          .reveal:nth-child(2) { transition-delay: 0.15s; }
          .reveal:nth-child(3) { transition-delay: 0.3s; }
        `}
      </style>

      {/* HERO SECTION */}
      <section style={heroWrapperStyle}>
        <img src="/Pictures/pulmwall.png" alt="Pulmonary Care" style={backgroundImageStyle} />
        
        <div style={contentLayoutStyle}>
          <div style={{...textSideStyle, flex: isMobile ? 'none' : '0 1 650px'}}>
            <h2 style={h2Style}>
              Specialized Pulmonary <br />
              <span style={{ color: '#6c4cff' }}>Care for Better Breathing</span>
            </h2>
            <p style={{...heroSubText, margin: isMobile ? '20px auto 0' : '20px 0 0'}}>
              Advanced treatment for asthma, COPD, and respiratory conditions using state-of-the-art pulmonary diagnostics.
            </p>
          </div>

          <div style={cardSideContainer}>
            <div style={doctorCardStyle} className="floating-card">
              <div style={statusBadgeStyle}>
                <span style={pulseIconStyle}></span> LIVE STATUS
              </div>
              <img src={doctors[currentDoctorIndex].img} alt={doctors[currentDoctorIndex].name} style={docImgStyle} />
              <h3 style={docNameStyle}>{doctors[currentDoctorIndex].name}</h3>
              <p style={docTitleStyle}>Consultant Pulmonologist</p>
              <div style={dividerStyle}></div>
              <p style={waitTextStyle}>Estimated Wait Time:</p>
              <div style={{...timerStyle, fontSize: isMobile ? '38px' : '48px'}}>{formatTime(timeLeft)}</div>
              <button
                onClick={handleClick}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: loading ? "#000" : "#6c4cff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Please wait..." : "Check In Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALISTS GRID */}
      <section style={{ padding: isMobile ? '60px 20px' : '80px 20px', backgroundColor: '#f4f7fa' }}>
        <h2 className="reveal" style={{ textAlign: 'center', color: '#1a3a8a', marginBottom: isMobile ? '30px' : '50px', fontSize: isMobile ? '24px' : '32px' }}>
          Meet Our Chest Specialists
        </h2>
        <div style={doctorsGridStyle}>
          {doctors.map((doc, index) => (
            <div key={index} style={doctorCardGridStyle} className="reveal">
              <img src={doc.img} alt={doc.name} style={{...gridDocImgStyle, width: isMobile ? '90px' : '110px', height: isMobile ? '90px' : '110px'}} />
              <p style={{ margin: 0, fontWeight: '600', fontSize: isMobile ? '0.9rem' : '1.1rem', color: '#333' }}>{doc.name}</p>
              <span style={{ fontSize: '11px', color: '#666' }}>MD, FCCP Pulmonology</span>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTICS SECTION */}
      <section style={{ padding: isMobile ? '60px 0' : '100px 0', backgroundColor: '#fff' }}>
        <div style={containerMaxWidth}>
          <div style={sectionHeaderStyle} className="reveal">
            <h2 style={{...sectionTitleStyle, fontSize: isMobile ? '28px' : '36px'}}>Pulmonary Function & Diagnostics</h2>
            <p style={sectionSubStyle}>Comprehensive evaluation of respiratory health.</p>
          </div>
          
          <div style={gridStyle}>
            {categories.map((cat, index) => (
              <div key={index} style={{...serviceCardStyle, padding: isMobile ? '25px' : '40px'}} className="reveal">
                <div style={iconBoxStyle}>{cat.icon}</div>
                <h3 style={catTitleStyle}>{cat.title}</h3>
                <p style={catDescStyle}>{cat.description}</p>
                <div style={testListStyle}>
                  {cat.tests.map((test, i) => (
                    <div key={i} style={testItemStyle}>
                      <span style={{...testNameStyle, fontSize: isMobile ? '13px' : '15px'}}>
                        <ChevronRight size={14} style={{ marginRight: '5px', color: '#6c4cff' }} />
                        {test.name}
                      </span>
                      <span style={{...testPriceStyle, fontSize: isMobile ? '13px' : '15px'}}>KES {test.price}</span>
                    </div>
                  ))}
                </div>
                <button style={cardButtonStyle}>Schedule Test</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MedicoreFooter/>

      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999 }}>
        <Ask />
      </div>
    </div>
  );
};

const backgroundImageStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(30%)', zIndex: 1 };
const h2Style = { color: '#fff', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: '1.1', margin: 0 };
const heroSubText = { color: '#ccc', fontSize: '1.2rem', maxWidth: '500px', lineHeight: '1.6' };
const textSideStyle = {};
const doctorCardStyle = { background: 'rgba(0, 51, 255, 0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '28px', padding: '30px', color: '#fff', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' };
const statusBadgeStyle = { display: 'inline-flex', alignItems: 'center', background: 'rgba(0, 255, 100, 0.2)', color: '#00ff64', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' };
const pulseIconStyle = { width: '8px', height: '8px', backgroundColor: '#00ff64', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 10px #00ff64' };
const docImgStyle = { width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #6c4cff', margin: '0 auto 20px auto', animation: 'blink 3.5s infinite' };
const docNameStyle = { fontSize: '24px', margin: '0 0 5px 0' };
const docTitleStyle = { fontSize: '14px', opacity: 0.8, margin: 0 };
const dividerStyle = { height: '1px', background: 'rgba(255,255,255,0.15)', margin: '20px 0' };
const waitTextStyle = { fontSize: '13px', opacity: 0.9, margin: 0 };
const timerStyle = { fontWeight: 'bold', color: '#6c4cff', margin: '10px 0', fontFamily: 'monospace' };
const doctorCardGridStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' };
const gridDocImgStyle = { objectFit: 'cover', borderRadius: '50%', border: '2px solid #6c4cff' };
const containerMaxWidth = { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
const sectionHeaderStyle = { textAlign: 'center', marginBottom: '60px' };
const sectionTitleStyle = { color: '#1a3a8a', marginBottom: '15px' };
const sectionSubStyle = { color: '#666', fontSize: '16px' };
const serviceCardStyle = { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #eef', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' };
const iconBoxStyle = { width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(108, 76, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' };
const catTitleStyle = { fontSize: '22px', color: '#333', marginBottom: '12px' };
const catDescStyle = { fontSize: '14px', color: '#777', lineHeight: '1.6', marginBottom: '30px' };
const testListStyle = { borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '30px', flexGrow: 1 };
const testItemStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' };
const testNameStyle = { color: '#444', display: 'flex', alignItems: 'center' };
const testPriceStyle = { fontWeight: 'bold', color: '#1a3a8a' };
const cardButtonStyle = { padding: '14px', borderRadius: '10px', border: '1px solid #6c4cff', background: 'none', color: '#6c4cff', fontWeight: 'bold', cursor: 'pointer' };

export default Pulmonary;