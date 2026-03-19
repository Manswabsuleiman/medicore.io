import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://admin-server-n95q.onrender.com/');

const AppointmentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [formData, setFormData] = useState({ 
    patientName: '', 
    date: '', 
    service: 'General Consultation' 
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth <= 480;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newAppointment = {
      patientName: formData.patientName,
      doctor: formData.service,
      date: formData.date,
      status: "Pending",
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      socket.emit('appointmentBooked', newAppointment);
      setMessage("✅Appointment sent to Admin!");
      setFormData({ patientName: '', date: '', service: 'General Consultation' });
      
      setTimeout(() => { 
        setIsOpen(false); 
        setMessage(''); 
      }, 1500);
    } catch (err) {
      console.error("Socket error:", err);
      setMessage("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    openButton: { 
      padding: isSmallScreen ? '12px 20px' : '14px 28px', 
      borderRadius: '50px', 
      border: 'none', 
      cursor: 'pointer', 
      background: '#0070f3', 
      color: '#fff', 
      fontWeight: '600',
      fontSize: isSmallScreen ? '14px' : '16px'
    },
    overlay: { 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.6)', 
      backdropFilter: 'blur(4px)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      zIndex: 1000,
      padding: '20px' 
    },
    modal: { 
      backgroundColor: '#fff', 
      padding: isSmallScreen ? '25px 20px' : '30px', 
      borderRadius: '20px', 
      width: '100%', 
      maxWidth: '400px',
      maxHeight: '90vh', 
      overflowY: 'auto', 
      position: 'relative', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      boxSizing: 'border-box'
    },
    input: { 
      width: '100%', 
      padding: '12px', 
      borderRadius: '10px', 
      border: '1px solid #ddd', 
      marginBottom: '15px', 
      fontSize: '16px', 
      boxSizing: 'border-box',
      outline: 'none',
      backgroundColor: '#f9f9f9'
    },
    submit: { 
      width: '100%', 
      padding: '14px', 
      borderRadius: '10px', 
      border: 'none', 
      backgroundColor: '#0070f3', 
      color: '#fff', 
      fontWeight: 'bold', 
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '5px'
    },
    closeX: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#999'
    }
  };

  return (
    <div>
      <button style={styles.openButton} onClick={() => setIsOpen(true)}>📅 Book Appointment</button>

      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeX} onClick={() => setIsOpen(false)}>✕</button>
            
            <h3 style={{ margin: '0 0 5px 0', fontSize: '22px', color: '#333' }}>Book a Slot</h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Fill in your details below.</p>
            
            {message && (
              <div style={{ 
                marginBottom: '15px', 
                padding: '12px', 
                borderRadius: '8px', 
                backgroundColor: message.includes('') ? '#e6f4ea' : '#fdecea', 
                color: message.includes('') ? '#188038' : '#d93025', 
                fontSize: '14px', 
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'block' }}>PATIENT NAME</label>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  style={styles.input} 
                  required 
                  value={formData.patientName} 
                  onChange={e => setFormData({...formData, patientName: e.target.value})} 
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'block' }}>APPOINTMENT DATE</label>
                <input 
                  type="date" 
                  style={styles.input} 
                  required 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'block' }}>SELECT SERVICE</label>
                <select 
                  style={styles.input} 
                  value={formData.service} 
                  onChange={e => setFormData({...formData, service: e.target.value})}
                >
                  <option>General Consultation</option>
                  <option>Follow-up Visit</option>
                  <option>Diagnostics</option>
                  <option>Pulmonary</option>
                  <option>Dental</option>
                  <option>Cardiology</option>
                  <option>Laboratory</option>
                  <option>Radiology</option>
                  <option>Orthopedics</option>
                </select>
              </div>

              <button type="submit" style={styles.submit} disabled={loading}>
                {loading ? "Processing..." : "Confirm Appointment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentModal;
