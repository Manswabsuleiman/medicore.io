import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  HeartPulse,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const MedicoreFooter = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const styles = {
    footer: {
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: isMobile ? '40px 20px 20px 20px' : '60px 20px 20px 20px',
      fontFamily: "'Inter', system-ui, sans-serif",
      borderTop: '4px solid #3b82f6',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px',
      marginBottom: '40px',
    },
    logoSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: isMobile ? 'center' : 'flex-start',
      textAlign: isMobile ? 'center' : 'left',
    },
    logoImage: {
      height: '50px',
      width: 'auto',
      maxWidth: '200px',
      objectFit: 'contain',
    },
    brandName: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#60a5fa',
    },
    heading: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '20px',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textAlign: isMobile ? 'center' : 'left',
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMobile ? 'center' : 'flex-start',
    },
    link: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
      transition: 'color 0.2s',
    },
    contactItem: {
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '12px',
      marginBottom: '18px',
      fontSize: '15px',
      color: '#cbd5e1',
      textAlign: isMobile ? 'center' : 'left',
    },
    emergencyCard: {
      backgroundColor: '#1e293b',
      padding: '25px',
      borderRadius: '12px',
      border: '1px solid #334155',
      maxWidth: isMobile ? '400px' : 'none',
      margin: isMobile ? '0 auto' : '0',
    },
    bottomBar: {
      borderTop: '1px solid #334155',
      paddingTop: '25px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: '#94a3b8',
      gap: '20px',
      textAlign: 'center',
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.logoSection}>
          <img 
            src="./public/Pictures/favicon.png" 
            alt="Medicore Logo" 
            style={styles.logoImage}
            onError={(e) => e.target.style.display = 'none'}
          />
          
          <div style={styles.brandName}>
            <HeartPulse size={28} />
            <span>Medicore.io</span>
          </div>
          
          <p style={{ lineHeight: '1.6', color: '#94a3b8', fontSize: '15px', maxWidth: isMobile ? '300px' : 'none' }}>
            Advanced healthcare solutions dedicated to your well-being. 
            Excellence in medicine, compassion in care.
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <Facebook size={22} style={{ cursor: 'pointer' }} />
            <Twitter size={22} style={{ cursor: 'pointer' }} />
            <Linkedin size={22} style={{ cursor: 'pointer' }} />
            <Instagram size={22} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div>
          <h3 style={styles.heading}>Services</h3>
          <ul style={styles.linkList}>
            <li><a href="/diagnostics" style={styles.link}><ChevronRight size={14} /> Diagnostics</a></li>
            <li><a href="/cardiology" style={styles.link}><ChevronRight size={14} /> Cardiology</a></li>
            <li><a href="/dental" style={styles.link}><ChevronRight size={14} /> Dental</a></li>
            <li><a href="/pulmonary" style={styles.link}><ChevronRight size={14} /> Pulmonary</a></li>
            <li><a href="/laboratory" style={styles.link}><ChevronRight size={14} /> Laboratory</a></li>
          </ul>
        </div>

        <div>
          <h3 style={styles.heading}>Location</h3>
          <div style={styles.contactItem}>
            <MapPin size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
            <span>123 Health Plaza, <br />Kenya, Nairobi KE 94103</span>
          </div>
          <div style={styles.contactItem}>
            <Phone size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
            <span>(254) 888-MED-0</span>
          </div>
          <div style={styles.contactItem}>
            <Mail size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
            <span>support@medicore.io</span>
          </div>
        </div>

        <div>
          <h3 style={styles.heading}>Security</h3>
          <div style={styles.emergencyCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: '10px', marginBottom: '10px' }}>
              <ShieldCheck size={24} color="#10b981" />
              <span style={{ fontWeight: '600' }}>HIPAA Compliant</span>
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 15px 0', textAlign: isMobile ? 'center' : 'left' }}>
              Your health data is encrypted and managed under the highest security standards.
            </p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '6px',
              width: '100%',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Patient Login
            </button>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div>
          © {new Date().getFullYear()} Medicore.io. Verified Healthcare Provider.
        </div>
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '15px' : '20px', 
          flexWrap: 'wrap', 
          justifyContent: 'center' 
        }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default MedicoreFooter;