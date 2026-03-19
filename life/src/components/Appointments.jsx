import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [bookedSlots, setBookedSlots] = useState([
    { date: '2026-02-10', time: '10:00' },
    { date: '2026-02-11', time: '14:00' },
  ]);

  const clients = [
    { name: "John Doe", feedback: "Excellent service, very professional!" },
    { name: "Jane Smith", feedback: "Got cured quickly and easily booked online." },
    { name: "Ahmed Ali", feedback: "The online appointment system is amazing." },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    const { name, phone, date, time } = formData;
    if (!name || !phone || !date || !time) {
      toast.error("Please fill in all fields!");
      return;
    }
    setBookedSlots([...bookedSlots, { date, time }]);
    toast.success(`Appointment booked successfully for ${name}!`);
    setFormData({ name: '', phone: '', date: '', time: '' });
    setOpenModal(false);
  };

  const isMobile = windowWidth <= 768;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#333', overflowX: 'hidden' }}>
      
      {/* Centered Hero Section */}
      <div style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        backgroundColor: '#000'
      }}>
        <img 
          src="./public/Pictures/medcal.png" 
          alt="Medical" 
          style={{ 
            position: 'absolute',
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            filter: 'brightness(0.6) blur(2px)',
            zIndex: 1
          }} 
        />
        
        {/* Content Box */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: isMobile ? '15px' : '20px',
          maxWidth: isMobile ? '90%' : '800px'
        }}>
          <h1 style={{ 
            fontSize: isMobile ? '32px' : '56px', 
            color: 'white', 
            fontWeight: '800', 
            marginBottom: '20px',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)',
            lineHeight: 1.2
          }}>
            Online Appointments & Prescriptions
          </h1>
          <p style={{ 
            fontSize: isMobile ? '16px' : '20px', 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: isMobile ? '25px' : '40px',
            lineHeight: '1.6'
          }}>
            Hassle-free healthcare at your fingertips. Book safely and securely.
          </p>

          <button 
            onClick={() => setOpenModal(true)}
            style={{
              padding: isMobile ? '16px 30px' : '22px 50px',
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: 'bold',
              backgroundColor: '#6c4ccf',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              boxShadow: '0 10px 30px rgba(108, 76, 207, 0.5)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.backgroundColor = '#5a3bb1';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#6c4ccf';
            }}
          >
            Book an Appointment Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: isMobile ? '25px' : '40px',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '24px' }}>New Appointment</h3>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} style={inputStyle}/>
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={inputStyle}/>
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle}/>
            <input type="time" name="time" value={formData.time} onChange={handleChange} style={inputStyle}/>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
              <button onClick={handleBooking} style={{ flex: 1, padding: '12px', backgroundColor: '#6c4ccf', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Confirm</button>
              <button onClick={() => setOpenModal(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#eee', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div style={{ padding: isMobile ? '40px 15px' : '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#6c4ccf', marginBottom: isMobile ? '20px' : '40px', fontSize: isMobile ? '24px' : '32px' }}>Happy Clients</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {clients.map((c, i) => (
            <div key={i} style={{ 
              padding: '20px', 
              background: '#f8f9fa', 
              borderRadius: '15px', 
              width: isMobile ? '100%' : '280px',
              boxSizing: 'border-box'
            }}>
              <p style={{ fontSize: '15px' }}>"{c.feedback}"</p>
              <h4 style={{ marginTop: '10px', color: '#6c4ccf' }}>- {c.name}</h4>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  boxSizing: 'border-box' // Important for responsiveness
};

export default Appointments;