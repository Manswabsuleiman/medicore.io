import React, { useState, useEffect } from 'react';
import { 
  Microscope, 
  Beaker, 
  Pipette, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  FlaskConical 
} from 'lucide-react';
import MedicoreFooter from '../components/Footer';
import Ask from '../components/Ask'; 

const Laboratory = () => {
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= 768;

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const doctors = [
    { name: "Dr. Johnwick Mwangi", img: "/Pictures/lab1.png" },
    { name: "Dr. Angel Sly", img: "/Pictures/lab2.png" },
    { name: "Dr. Mack E.", img: "/Pictures/lab3.png" },
    { name: "Dr. Steve Parte", img: "/Pictures/lab4.png" },
  ];

  const categories = [
    {
      title: "Hematology & Blood",
      icon: <FlaskConical size={32} color="#6c4cff" />,
      description: "Comprehensive blood cell analysis and coagulation studies.",
      tests: [
        { name: "Full Blood Count (FBC)", price: "1,500" },
        { name: "Blood Group & Rhesus", price: "800" },
        { name: "ESR (Inflammation)", price: "1,200" }
      ]
    },
    {
      title: "Clinical Biochemistry",
      icon: <Beaker size={32} color="#6c4cff" />,
      description: "Precise chemical analysis of body fluids and metabolic panels.",
      tests: [
        { name: "Liver Function Test", price: "3,500" },
        { name: "Kidney Profile (U/E/C)", price: "4,200" },
        { name: "Lipid Profile (Cholesterol)", price: "2,800" }
      ]
    },
    {
      title: "Microbiology",
      icon: <Microscope size={32} color="#6c4cff" />,
      description: "Detecting pathogens via advanced culture and sensitivity tests.",
      tests: [
        { name: "Urinalysis (Full)", price: "1,000" },
        { name: "Stool Microscopy", price: "1,200" },
        { name: "Antibiotic Sensitivity", price: "3,000" }
      ]
    }
  ];
  useEffect(() => {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

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

  const heroStyle = { 
    position: 'relative', 
    width: '100%', 
    minHeight: isMobile ? '100vh' : '85vh', 
    display: 'flex', 
    alignItems: 'center', 
    overflow: 'hidden' 
  };

  const heroImgStyle = { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover', 
    objectPosition: 'center',
    filter: 'brightness(35%)', 
    position: 'absolute', 
    inset: 0, 
    zIndex: 1 
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
    padding: isMobile ? '20px' : '40px 60px', 
    width: '100%',
    textAlign: isMobile ? 'center' : 'left'
  };

  const cardSideContainer = { 
    position: isMobile ? 'relative' : 'absolute', 
    right: isMobile ? 'auto' : '2%', 
    top: isMobile ? 'auto' : '50%', 
    transform: isMobile ? 'none' : 'translateY(-50%)', 
    width: isMobile ? '100%' : '380px',
    marginTop: isMobile ? '40px' : '0',
    maxWidth: '400px'
  };

  const docGridStyle = { 
    display: 'grid', 
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: isMobile ? '15px' : '30px', 
    maxWidth: '1000px', 
    margin: '0 auto' 
  };

  const categoryGridStyle = { 
    display: 'grid', 
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', 
    gap: '30px' 
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: '#fff', overflowX: 'hidden' }}>
      
      <style>
        {`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          @keyframes floatEffect { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
          .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
          .reveal.active { opacity: 1; transform: translateY(0); }
          .hero-card-float { animation: ${isMobile ? 'none' : 'floatEffect 5s ease-in-out infinite'}; }
          .reveal:nth-child(2) { transition-delay: 0.1s; }
          .reveal:nth-child(3) { transition-delay: 0.2s; }
        `}
      </style>

      <section style={heroStyle}>
        <img src="/Pictures/labwall.png" alt="Clinical Lab Hero" style={heroImgStyle} />

        <div style={contentLayoutStyle}>
          <div style={{ flex: isMobile ? 'none' : '0 1 600px', color: '#fff' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : 'clamp(32px,5vw,52px)', lineHeight: 1.1, margin: 0 }}>
              Precision Diagnostics <br />
              <span style={{ color: '#6c4cff' }}>Trusted Lab Results</span>
            </h2>
            <p style={{ marginTop: '20px', fontSize: isMobile ? '1rem' : '1.2rem', color: '#ccc', lineHeight: '1.6' }}>
              ISO-certified clinical analysis with state-of-the-art automation. Delivering accuracy you can depend on for every diagnosis.
            </p>
          </div>

          <div style={cardSideContainer}>
            <div style={liveCardStyle} className="hero-card-float">
              <div style={statusBadgeStyle}>
                <span style={pulseDotStyle}></span> LIVE STATUS
              </div>
              <img 
                src={doctors[currentDoctorIndex].img} 
                alt={doctors[currentDoctorIndex].name} 
                style={docHeroImgStyle} 
              />
              <h3 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{doctors[currentDoctorIndex].name}</h3>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>Consultant Pathologist</p>
              <div style={dividerStyle}></div>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Next Collection Window:</p>
              <div style={{...timerTextStyle, fontSize: isMobile ? '36px' : '42px'}}>{formatTime(timeLeft)}</div>

              <button
                onClick={handleClick}
                style={checkInButtonStyle(loading)}
              >
                {loading ? "Please wait..." : "Check In Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 20px' : '80px 20px', backgroundColor: '#f8f9ff' }}>
        <h2 style={{...sectionTitleStyle, fontSize: isMobile ? '24px' : '32px'}} className="reveal">Meet Our Clinical Specialists</h2>
        <div style={docGridStyle}>
          {doctors.map((doc, index) => (
            <div key={index} style={docItemStyle} className="reveal">
              <img src={doc.img} alt={doc.name} style={{...docGridImgStyle, width: isMobile ? '80px' : '110px', height: isMobile ? '80px' : '110px'}} />
              <p style={{ margin: 0, fontWeight: '600', color: '#1a3a8a', fontSize: isMobile ? '14px' : '16px' }}>{doc.name}</p>
              <span style={{ fontSize: '11px', color: '#666' }}>Lead Lab Technologist</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: isMobile ? '60px 20px' : '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '60px' }} className="reveal">
            <h2 style={{...sectionTitleStyle, fontSize: isMobile ? '24px' : '32px'}}>Medical Laboratory Panels</h2>
            <p style={{ color: '#666', fontSize: isMobile ? '14px' : '16px' }}>Automated, high-capacity testing for all clinical needs.</p>
          </div>

          <div style={categoryGridStyle}>
            {categories.map((cat, index) => (
              <div key={index} style={{...catCardStyle, padding: isMobile ? '25px' : '40px'}} className="reveal">
                <div style={iconCircleStyle}>{cat.icon}</div>
                <h3 style={{ fontSize: '22px', color: '#1a3a8a', marginBottom: '10px' }}>{cat.title}</h3>
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '25px', lineHeight: 1.6 }}>{cat.description}</p>
                <div style={testListWrapper}>
                  {cat.tests.map((test, i) => (
                    <div key={i} style={{...testRowStyle, fontSize: isMobile ? '13px' : '15px'}}>
                      <span style={testNameStyle}>
                        <ChevronRight size={14} style={{ marginRight: '5px', color: '#6c4cff' }} />
                        {test.name}
                      </span>
                      <span style={priceTagStyle}>KES {test.price}</span>
                    </div>
                  ))}
                </div>
                <button style={bookBtnStyle}>Inquire Now</button>
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
const liveCardStyle = { width: '100%', background: 'rgba(6, 43, 175, 0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '30px', color: '#fff', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' };
const statusBadgeStyle = { display: 'inline-flex', alignItems: 'center', background: 'rgba(0,255,100,0.2)', color: '#00ff64', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' };
const pulseDotStyle = { width: '8px', height: '8px', backgroundColor: '#00ff64', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 10px #00ff64' };
const docHeroImgStyle = { width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #6c4cff', margin: '0 auto 15px auto', animation: 'blink 3.5s infinite' };
const dividerStyle = { height: '1px', background: 'rgba(255,255,255,0.15)', margin: '15px 0' };
const timerTextStyle = { fontWeight: 'bold', color: '#6c4cff', margin: '10px 0', fontFamily: 'monospace' };
const sectionTitleStyle = { textAlign: 'center', color: '#1a3a8a', marginBottom: '40px' };
const docItemStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' };
const docGridImgStyle = { objectFit: 'cover', borderRadius: '50%', border: '2px solid #6c4cff', marginBottom: '15px' };
const catCardStyle = { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #eee', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' };
const iconCircleStyle = { width: '60px', height: '60px', borderRadius: '15px', backgroundColor: 'rgba(108, 76, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' };
const testListWrapper = { borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '25px', flexGrow: 1 };
const testRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' };
const testNameStyle = { color: '#444', display: 'flex', alignItems: 'center' };
const priceTagStyle = { fontWeight: 'bold', color: '#1a3a8a' };
const bookBtnStyle = { padding: '12px', borderRadius: '10px', border: '1px solid #6c4cff', background: 'none', color: '#6c4cff', fontWeight: 'bold', cursor: 'pointer' };

const checkInButtonStyle = (loading) => ({
  width: "100%",
  padding: "14px 20px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: loading ? "#000000" : "#6c4cff",
  color: "#fff",
  fontWeight: "bold",
  cursor: loading ? "not-allowed" : "pointer",
  opacity: loading ? 0.6 : 1,
  pointerEvents: loading ? "none" : "auto",
  transition: "all 0.3s ease",
});

export default Laboratory;
