import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // ================= RESPONSIVENESS HANDLER =================
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;

  const faqData = [
    {
      question: "What medical services do you provide?",
      answer: "We offer a wide range of services including specialized pulmonary care, general check-ups, diagnostics, and emergency respiratory support."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment through our online portal, via the 'Book Now' button on our homepage, or by calling our facility directly."
    },
    {
      question: "Do you accept international insurance?",
      answer: "Yes, Medicore.io works with several major international insurance providers. Please contact our billing department for a full list."
    },
    {
      question: "Are your doctors board-certified?",
      answer: "Absolutely. All our specialists are board-certified with years of experience in their respective medical fields."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: isMobile ? '40px auto' : '80px auto', 
      padding: '0 20px',
      fontFamily: "'Poppins', sans-serif",
      overflowX: 'hidden'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: isTablet ? 'column' : 'row',
        alignItems: isTablet ? 'center' : 'flex-start', 
        gap: isMobile ? '30px' : '60px'
      }}>
        
        {/* LEFT SIDE: Image */}
        <div style={{ 
          flex: '1', 
          width: '100%',
          maxWidth: isTablet ? '600px' : 'none'
        }}>
          <img 
            src="./public/Pictures/question.png" 
            alt="Medical Support" 
            style={{ 
              width: '100%', 
              borderRadius: '20px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              display: 'block',
              height: 'auto'
            }} 
          />
        </div>

        {/* RIGHT SIDE: Q&A Dropdowns */}
        <div style={{ 
          flex: '1.2', 
          width: '100%',
          marginTop: isTablet ? '20px' : '45px' 
        }}>
          <h2 style={{ 
            color: '#182545', 
            fontSize: isMobile ? '24px' : '32px', 
            marginBottom: '30px',
            textAlign: isTablet ? 'center' : 'left',
            lineHeight: '1.3'
          }}>
            Frequently Asked <span style={{ color: '#5e49bd' }}>Questions</span>
          </h2>

          {faqData.map((item, index) => (
            <div 
              key={index}
              onClick={() => toggleAccordion(index)}
              style={{
                marginBottom: '15px',
                border: '1px solid #eee',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: activeIndex === index ? '#f8f9ff' : '#fff',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.borderColor = '#6c4cff';
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.borderColor = '#eee';
              }}
            >
              <div style={{
                padding: isMobile ? '15px 18px' : '20px 25px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: activeIndex === index ? '#6c4cff' : '#333',
                  fontSize: isMobile ? '14px' : '16px',
                  lineHeight: '1.4'
                }}>
                  {item.question}
                </span>
                {activeIndex === index ? 
                  <ChevronUp size={isMobile ? 18 : 20} color="#6c4cff" style={{ flexShrink: 0 }} /> : 
                  <ChevronDown size={isMobile ? 18 : 20} color="#aaa" style={{ flexShrink: 0 }} />
                }
              </div>

              <div style={{
                maxHeight: activeIndex === index ? '300px' : '0',
                padding: activeIndex === index ? (isMobile ? '0 18px 18px 18px' : '0 25px 25px 25px') : (isMobile ? '0 18px' : '0 25px'),
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#666',
                fontSize: isMobile ? '13px' : '14px',
                lineHeight: '1.6'
              }}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Question;