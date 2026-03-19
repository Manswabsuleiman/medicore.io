import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Specialists = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const specialists = [
    {
      name: "Dr. Sophy Gardner",
      field: "Cardiology",
      desc: "Expert in interventional cardiology and heart failure management.",
      hours: "Mon-Thu: 08:00 - 18:00",
      img: "/Pictures/labwall.png"
    },
    {
      name: "Dr. Ann Great",
      field: "Pediatrics",
      desc: "Specializing in neonatal care and adolescent developmental health.",
      hours: "Mon-Fri: 09:00 - 17:00",
      img: "/Pictures/doctor2.png"
    },
    {
      name: "Dr. John Whatson",
      field: "Neurology",
      desc: "Focuses on neurodegenerative disorders and sleep medicine.",
      hours: "Tue-Sat: 10:00 - 19:00",
      img: "/Pictures/doctor3.png"
    },
    {
      name: "Dr. Julia Roberts",
      field: "Cardiology",
      desc: "Specialist in non-invasive cardiac imaging and diagnostics.",
      hours: "Mon-Fri: 08:00 - 16:00",
      img: "/Pictures/logy3.png"
    },
    {
      name: "Dr. Alveoli Smith",
      field: "Pulmonology",
      desc: "Dedicated to asthma management and chronic lung diseases.",
      hours: "Wed-Sun: 08:00 - 15:00",
      img: "/Pictures/doctors.png"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollAmount = isMobile ? clientWidth : clientWidth * 0.75;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getFlexBasis = () => {
    if (isMobile) return '0 0 100%';
    if (isTablet) return '0 0 calc(50% - 20px)';
    return '0 0 calc(25% - 20px)';
  };

  return (
    <div style={{ padding: isMobile ? '40px 0' : '80px 0', backgroundColor: '#fff', fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: '800', color: '#1a3a8a', margin: 0 }}>
            OUR <span style={{ color: '#5c63c4' }}>SPECIALISTS</span>
          </h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#0d00ff', margin: '15px auto' }}></div>
        </div>

        <button 
          onClick={() => scroll('left')} 
          style={navButtonStyle({ 
            left: isMobile ? '5px' : '-20px',
            scale: isMobile ? '0.8' : '1'
          })}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          style={navButtonStyle({ 
            right: isMobile ? '5px' : '-20px',
            scale: isMobile ? '0.8' : '1'
          })}
        >
          <ChevronRight size={24} />
        </button>

        <div 
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '25px',
            padding: '20px 0',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {specialists.map((doc, index) => (
            <div 
              key={index} 
              style={{
                flex: getFlexBasis(),
                minWidth: isMobile ? 'auto' : '280px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                border: '1px solid #f0f0f0',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ height: isMobile ? '240px' : '280px', width: '100%', backgroundColor: '#f8f9fa' }}>
                <img 
                  src={doc.img} 
                  alt={doc.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div style={{ padding: isMobile ? '20px' : '25px', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#4b6ab9', fontSize: '18px' }}>{doc.name}</h4>
                <p style={{ margin: '0 0 15px 0', color: '#5e57c1', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {doc.field.toUpperCase()}
                </p>
                
                <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.6', marginBottom: '20px', minHeight: '40px' }}>
                  {doc.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#555', fontSize: '11px', marginBottom: '20px' }}>
                  <Clock size={14} color="#1a3a8a" />
                  <span>{doc.hours}</span>
                </div>

                <button 
                  onClick={() => navigate('/cardiology')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: index % 2 === 0 ? '#1a3a8a' : '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  Booking a visit <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const navButtonStyle = ({ left, right, scale }) => ({
  position: 'absolute',
  top: '55%',
  left: left || 'auto',
  right: right || 'auto',
  transform: `translateY(-50%) scale(${scale || 1})`,
  zIndex: 10,
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: 'none',
  boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1a3a8a',
  transition: '0.3s'
});

export default Specialists;
