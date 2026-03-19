import React, { useState, useEffect } from 'react';

const Medical = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  return (
    <div style={{ width: '100%', fontFamily: "'Poppins', sans-serif", backgroundColor: '#fff', overflowX: 'hidden' }}>
      
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: isMobile ? 'auto' : '60vh', 
        minHeight: isMobile ? '300px' : '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobile ? '60px' : '0'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(139, 146, 158, 0.85), rgba(45, 92, 180, 0.85)), url("./public/Pictures/doctors.png")`,
          backgroundSize: 'cover',
          marginTop: '55px',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>

        <div style={{
          position: isMobile ? 'relative' : 'absolute',
          bottom: isMobile ? '-50px' : '-160px', 
          width: isMobile ? '90%' : '85%',

          maxWidth: '950px', 
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          zIndex: 10,
          borderRadius: '8px',
          overflow: isMobile ? 'hidden' : 'visible',
          margin: isMobile ? '0 auto' : '0'
        }}>
          
          <div style={{ 
            flex: '1', 
            padding: isMobile ? '30px 20px' : '40px 40px',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h5 style={{ color: '#aaa', letterSpacing: '3px', fontSize: '10px', margin: '0 0 12px 0', fontWeight: '600' }}>
                WHO WE ARE
            </h5>
            
            <h2 style={{ color: '#1a3a8a', fontSize: isMobile ? '22px' : '28px', fontWeight: '700', margin: 0, lineHeight: 1.1 }}>
              MEDICORE.IO CENTER <br />
              <span style={{ color: '#1a3a8a' }}>IN KENYA</span>
            </h2>

            <p style={{ 
                color: '#333', 
                fontSize: isMobile ? '14px' : '16px', 
                fontWeight: '600', 
                marginTop: '20px', 
                marginBottom: '12px', 
                lineHeight: '1.4' 
            }}>
              Reasonable health care plans & insurance.
            </p>

            <p style={{ color: '#777', fontSize: '12px', lineHeight: '1.6', marginBottom: '25px' }}>
              MEDICORE Medical Center provides choices for lab tests on-site at no cost for prioritized patients.
            </p>

            <a href="#" style={{ 
                color: '#1a3a8a', 
                fontWeight: 'bold', 
                textDecoration: 'none', 
                borderBottom: '2px solid #1a3a8a', 
                paddingBottom: '3px', 
                fontSize: '11px',
                letterSpacing: '1px'
            }}>
              READ MORE
            </a>

            {/* Signature Section */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: isMobile ? 'center' : 'flex-start',
              gap: '15px', 
              marginTop: '30px' 
            }}>
               <img 
                 src="./public/Pictures/sign.png" 
                 alt="Signature" 
                 style={{ height: '35px', opacity: 0.8 }} 
               />
               <div style={{ borderLeft: '1px solid #eee', paddingLeft: '15px', textAlign: 'left' }}>
                  <p style={{ margin: 0, fontWeight: '700', color: '#1a3a8a', fontSize: '14px' }}>Smith Jefferson</p>
                  <p style={{ margin: 0, fontSize: '10px', color: '#aaa', fontWeight: '500' }}>Chief Medical Officer</p>
               </div>
            </div>
          </div>

          <div style={{ 
            flex: isMobile ? 'none' : '0.8', 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: isMobile ? '20px 0' : '0'
          }}>
            
            <div style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: isMobile ? '100%' : '80%',
              height: isMobile ? '60%' : '85%',
              backgroundColor: '#1a3a8a',
              zIndex: 1,
              borderTopLeftRadius: isMobile ? '0' : '40px'
            }}></div>

            <div style={{
              position: 'relative',
              zIndex: 2,
              width: isMobile ? '200px' : '260px', 
              height: isMobile ? '230px' : '300px', 
              backgroundColor: '#fff',
              marginRight: isMobile ? '0' : '20px',
              marginBottom: isMobile ? '20px' : '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
                <div style={{
                    position: 'absolute',
                    width: isMobile ? '180px' : '240px',
                    height: isMobile ? '180px' : '240px',
                    borderRadius: '50%',
                    border: `${isMobile ? '6px' : '10px'} solid #1a3a8a`,
                    zIndex: 3,
                    pointerEvents: 'none'
                }}></div>

                <img 
                    src="./public/Pictures/pulm2.png" 
                    alt="Head Specialist" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }} 
                />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: isMobile ? '100px' : '300px' }}></div>
      
    </div>
  );
};

export default Medical;