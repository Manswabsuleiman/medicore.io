import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Zap, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Stethoscope 
} from 'lucide-react';
import MedicoreFooter from '../components/Footer';
import Ask from '../components/Ask'; // 1. IMPORT MOUNTED HERE

const Cardiology = () => {
  const [timeLeft, setTimeLeft] = useState(2700); 
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1024;

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const doctors = [
    { name: "Dr. Shantel Kristen", img: "./public/Pictures/logy3.png" },
    { name: "Dr. Shurti Mahrti", img: "./public/Pictures/logy2.png" },
    { name: "Dr. Selem", img: "./public/Pictures/logy1.png" },
    { name: "Dr. Culture", img: "./public/Pictures/logy4.png" },
  ];

  const categories = [
    {
      title: "Non-Invasive Imaging",
      icon: <Heart size={32} color="#6c4cff" />,
      description: "State-of-the-art ultrasound and imaging for structural heart analysis.",
      tests: [
        { name: "2D Echocardiogram", price: "8,500" },
        { name: "Stress Echocardiography", price: "12,000" },
        { name: "Carotid Doppler", price: "6,500" }
      ]
    },
    {
      title: "Electrophysiology",
      icon: <Activity size={32} color="#6c4cff" />,
      description: "Advanced monitoring of heart rhythms and electrical conduction.",
      tests: [
        { name: "Resting ECG", price: "2,000" },
        { name: "Holter Monitor (24hr)", price: "7,500" },
        { name: "Treadmill Stress Test", price: "5,500" }
      ]
    },
    {
      title: "Vascular Diagnostics",
      icon: <Zap size={32} color="#6c4cff" />,
      description: "Assessment of arterial health and peripheral blood flow efficiency.",
      tests: [
        { name: "ABI Vascular Study", price: "4,000" },
        { name: "Venous Mapping", price: "9,000" },
        { name: "Arterial Duplex", price: "7,500" }
      ]
    }
  ];

  useEffect(() => {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
      setTimeLeft(2700);
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

  const heroStyle = { 
    position: 'relative', 
    width: '100%', 
    minHeight: isMobile ? 'auto' : '90vh', 
    display: 'flex', 
    alignItems: 'center', 
    overflow: 'hidden',
    padding: isMobile ? '80px 0 40px 0' : '0'
  };

  const contentLayoutStyle = { 
    position: 'relative', 
    zIndex: 2, 
    display: 'flex', 
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'flex-start', 
    alignItems: 'center', 
    maxWidth: '1600px', 
    margin: '0 auto', 
    padding: isMobile ? '0 20px' : '0 40px', 
    width: '100%',
    textAlign: isMobile ? 'center' : 'left'
  };

  const cardSideContainer = { 
    position: isMobile ? 'relative' : 'absolute', 
    right: isMobile ? 'auto' : '3%', 
    top: isMobile ? 'auto' : '50%', 
    transform: isMobile ? 'none' : 'translateY(-50%)', 
    width: isMobile ? '100%' : '380px',
    maxWidth: '400px',
    marginTop: isMobile ? '40px' : '0',
    zIndex: 10
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: '#fff', overflowX: 'hidden' }}>
      <style>
        {`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
          .reveal.active { opacity: 1; transform: translateY(0); }
          .floating-card { animation: ${isMobile ? 'none' : 'float 5s ease-in-out infinite'}; }
        `}
      </style>

      {/* HERO SECTION */}
      <section style={heroStyle}>
        <img src="/Pictures/card2.png" alt="Cardiology Center" style={heroImgStyle} />
        <div style={contentLayoutStyle}>
          <div style={{ flex: isMobile ? 'none' : '0 1 650px', color: '#fff' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px,5vw,52px)', lineHeight: 1.1, margin: 0 }}>
              Advanced Cardiology <br />
              <span style={{ color: '#6c4cff' }}>For Every Heartbeat</span>
            </h2>
            <p style={{ marginTop: '20px', fontSize: isMobile ? '1rem' : '1.2rem', color: '#ccc', lineHeight: '1.6' }}>
              Comprehensive cardiac care utilizing cutting-edge diagnostic technology. We protect your heart's health through precision.
            </p>
          </div>

          <div style={cardSideContainer}>
            <div style={liveCardStyle} className="floating-card">
              <div style={statusBadgeStyle}><span style={pulseDotStyle}></span> LIVE STATUS</div>
              <img src={doctors[currentDoctorIndex].img} alt={doctors[currentDoctorIndex].name} style={docHeroImgStyle} />
              <h3 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{doctors[currentDoctorIndex].name}</h3>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Consultant Cardiologist</p>
              <div style={dividerStyle}></div>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Next Available Consultation:</p>
              <div style={timerTextStyle}>{formatTime(timeLeft)}</div>

              <button
                onClick={handleClick}
                disabled={loading}
                style={checkInBtnStyle(loading)}
              >
                {loading ? "Please wait for the doctor" : "Check In Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 20px' : '80px 20px', backgroundColor: '#f8f9ff' }}>
        <h2 style={sectionTitleStyle} className="reveal">Meet Our Cardiac Board</h2>
        <div style={docGridStyle(isMobile)}>
          {doctors.map((doc, index) => (
            <div key={index} style={docItemStyle} className="reveal">
              <img src={doc.img} alt={doc.name} style={{...docGridImgStyle, width: isMobile ? '90px' : '110px', height: isMobile ? '90px' : '110px'}} />
              <p style={{ margin: 0, fontWeight: '600', color: '#1a3a8a', fontSize: isMobile ? '14px' : '16px' }}>{doc.name}</p>
              <span style={{ fontSize: '12px', color: '#666' }}>MD, FACC Cardiology</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 20px' : '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
            <h2 style={sectionTitleStyle}>Cardiovascular Diagnostics</h2>
            <p style={{ color: '#666', fontSize: isMobile ? '14px' : '16px' }}>Precision testing for heart structure, rhythm, and vascular health.</p>
          </div>

          <div style={categoryGridStyle(isMobile, isTablet)}>
            {categories.map((cat, index) => (
              <div key={index} style={catCardStyle} className="reveal">
                <div style={iconCircleStyle}>{cat.icon}</div>
                <h3 style={{ fontSize: '22px', color: '#1a3a8a', marginBottom: '10px' }}>{cat.title}</h3>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '25px', lineHeight: 1.6 }}>{cat.description}</p>
                <div style={testListWrapper}>
                  {cat.tests.map((test, i) => (
                    <div key={i} style={testRowStyle}>
                      <span style={testNameStyle}>
                        <ChevronRight size={14} style={{ marginRight: '5px', color: '#6c4cff' }} />
                        {test.name}
                      </span>
                      <span style={priceTagStyle}>KES {test.price}</span>
                    </div>
                  ))}
                </div>
                <button style={bookBtnStyle}>Book Screening</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MedicoreFooter/>

      {/* 2. ASK COMPONENT MOUNTED GLOBALLY */}
      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 9999 }}>
        <Ask />
      </div>
    </div>
  );
};

/*--------- STYLES HELPERS -----------*/
const heroImgStyle = { width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(35%)', position: 'absolute', inset: 0, zIndex: 1 };
const liveCardStyle = { width: '100%', background: 'rgba(6, 43, 175, 0.15)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '28px', padding: '30px', color: '#fff', textAlign: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.45)' };
const statusBadgeStyle = { display: 'inline-flex', alignItems: 'center', background: 'rgba(0,255,100,0.2)', color: '#00ff64', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' };
const pulseDotStyle = { width: '8px', height: '8px', backgroundColor: '#00ff64', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 10px #00ff64' };
const docHeroImgStyle = { width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #6c4cff', margin: '0 auto 15px auto', animation: 'blink 3.5s infinite' };
const dividerStyle = { height: '1px', background: 'rgba(255,255,255,0.15)', margin: '15px 0' };
const timerTextStyle = { fontSize: '42px', fontWeight: 'bold', color: '#6c4cff', margin: '10px 0', fontFamily: 'monospace' };
const sectionTitleStyle = { textAlign: 'center', color: '#1a3a8a', marginBottom: '40px' };
const docItemStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };
const docGridImgStyle = { objectFit: 'cover', borderRadius: '50%', border: '2px solid #6c4cff', marginBottom: '15px' };
const catCardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' };
const iconCircleStyle = { width: '60px', height: '60px', borderRadius: '15px', backgroundColor: 'rgba(108, 76, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' };
const testListWrapper = { borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '25px', flexGrow: 1 };
const testRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' };
const testNameStyle = { color: '#444', display: 'flex', alignItems: 'center' };
const priceTagStyle = { fontWeight: 'bold', color: '#1a3a8a' };
const bookBtnStyle = { padding: '12px', borderRadius: '10px', border: '1px solid #6c4cff', background: 'none', color: '#6c4cff', fontWeight: 'bold', cursor: 'pointer' };

const checkInBtnStyle = (loading) => ({
  width: "100%",
  padding: "14px 20px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: loading ? "#000000" : "#6c4cff",
  color: "#fff",
  fontWeight: "bold",
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.6 : 1,
  transition: "all 0.3s ease",
});

const docGridStyle = (isMobile) => ({ 
  display: 'grid', 
  gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
  gap: isMobile ? '15px' : '30px', 
  maxWidth: '1000px', 
  margin: '0 auto' 
});

const categoryGridStyle = (isMobile, isTablet) => ({ 
  display: 'grid', 
  gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', 
  gap: '30px' 
});

export default Cardiology;