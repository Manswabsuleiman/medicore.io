import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

const MEDICORE_FAQ = {
  "hello": "Hello! I'm Medicore AI. How can I help you with our medical services today?",
  "hi": "Hi there! Welcome to Medicore.io. Need help booking an appointment?",
  "services": "Medicore.io provides online doctor consultations, diagnostic tests, dental tests, lab appointments, and personalized health guidance.",
  "appointment": "You can book an appointment: just sign in and create an account, then click the 'Book a consultation' button, then proceed to selecting the kind of services you need.",
  "cost": "Consultation fees vary by specialist. General check-ups start from affordable rates listed on our pricing page.",
  "doctors": "We have a wide range of certified specialists, including cardiologists, dermatologists, and pediatricians ready to serve you.",
  "contact": "You can reach Medicore support at support@medicore.io or call our 24/7 helpline.",
  "ok": "Thank you! 😊",
  "thanks": "You're very welcome! Is there anything else I can help you with?",
  "default": "I'm sorry, I don't have that specific information. Would you like to know about our consultations, appointments, or medical services?"
};

const AIChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello 👋 I'm Medicore AI. How can I assist you with Medicore.io today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const chatEndRef = useRef(null);

  // Handle screen resizing for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const isSmallScreen = windowWidth <= 768;

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.toLowerCase().trim();
    const userMessage = { role: "user", text: input };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = MEDICORE_FAQ.default;

      if (userText === "ok" || userText === "okay") {
        aiResponse = MEDICORE_FAQ.ok;
      } 
      else if (userText.includes("thanks") || userText.includes("thank you")) {
        aiResponse = MEDICORE_FAQ.thanks;
      }
      else if (userText.includes("service")) {
        aiResponse = MEDICORE_FAQ.services;
      }
      else if (userText.includes("appointment") || userText.includes("book")) {
        aiResponse = MEDICORE_FAQ.appointment;
      }
      else if (userText.includes("hello") || userText.includes("hi")) {
        aiResponse = MEDICORE_FAQ.hello;
      }
      else if (userText.includes("price") || userText.includes("cost") || userText.includes("pay")) {
        aiResponse = MEDICORE_FAQ.cost;
      }
      else if (userText.includes("doctor") || userText.includes("specialist")) {
        aiResponse = MEDICORE_FAQ.doctors;
      }
      else if (userText.includes("contact") || userText.includes("email")) {
        aiResponse = MEDICORE_FAQ.contact;
      }

      setMessages(prev => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1500); 
  };

  return (
    <>
      {!isOpen && (
        <div onClick={() => setIsOpen(true)} style={floatingButtonStyle(isSmallScreen)}>
          <img src="./Pictures/favicon.png" alt="AI" style={floatingImgStyle} />
        </div>
      )}

      {isOpen && (
        <div style={panelStyle(isSmallScreen)}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={headerLeftStyle}>
              <img style={{ width: isSmallScreen ? 35 : 45 }} src="./Pictures/favicon.png" alt="Logo" />
              <strong style={{ fontSize: isSmallScreen ? "14px" : "16px" }}>Medicore AI Assistant</strong>
            </div>
            <X size={isSmallScreen ? 20 : 24} style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages */}
          <div style={messagesContainerStyle}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                display: "flex", 
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start", 
                marginBottom: 15 
              }}>
                <div style={{
                  maxWidth: "85%",
                  padding: isSmallScreen ? "10px 14px" : "14px 18px",
                  borderRadius: 20,
                  background: msg.role === "user" ? "linear-gradient(135deg, #0d3acd, #062b87)" : "#67e8f9",
                  color: msg.role === "user" ? "#fff" : "#000",
                  fontSize: isSmallScreen ? 13 : 15,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  lineHeight: "1.4"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ color: "#ffffff", fontSize: isSmallScreen ? 12 : 14, fontStyle: "italic", marginBottom: 15, marginLeft: 5 }}>
                😊 Medicore AI is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div style={inputContainerStyle}>
            <input
              type="text"
              placeholder="Ask about Medicore-io..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              style={inputStyle}
            />
            <button onClick={handleSend} style={sendButtonStyle(isSmallScreen)}>
              <Send size={isSmallScreen ? 18 : 20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- RESPONSIVE STYLES ---

const floatingButtonStyle = (isSmallScreen) => ({ 
  position: "fixed", 
  bottom: isSmallScreen ? 15 : 25, 
  right: isSmallScreen ? 15 : 25, 
  width: isSmallScreen ? 55 : 65, 
  height: isSmallScreen ? 55 : 65, 
  borderRadius: "50%", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)", 
  cursor: "pointer", 
  zIndex: 9999, 
  background: "linear-gradient(135deg, #0ea5e9, #2563eb)" 
});

const floatingImgStyle = { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" };

const panelStyle = (isSmallScreen) => ({ 
  position: "fixed", 
  bottom: isSmallScreen ? 0 : 25, 
  right: isSmallScreen ? 0 : 25, 
  width: isSmallScreen ? "100%" : 450, // Reduced width for better desktop look, changed to 100% for mobile
  height: isSmallScreen ? "100%" : 550, // Full height on mobile
  maxHeight: isSmallScreen ? "100vh" : "80vh",
  background: "#050037", 
  borderRadius: isSmallScreen ? 0 : 20, 
  display: "flex", 
  flexDirection: "column", 
  overflow: "hidden", 
  boxShadow: "0 15px 40px rgba(0,0,0,0.5)", 
  zIndex: 9999,
  border: isSmallScreen ? "none" : "1px solid rgba(255,255,255,0.1)"
});

const headerStyle = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  padding: "15px 20px", 
  background: "linear-gradient(135deg, #0ea5e9, #2563eb)", 
  color: "#fff",
  flexShrink: 0
};

const headerLeftStyle = { display: "flex", alignItems: "center", gap: 12 };

const messagesContainerStyle = { 
  flex: 1, 
  padding: "20px", 
  overflowY: "auto",
  display: "flex",
  flexDirection: "column"
};

const inputContainerStyle = { 
  display: "flex", 
  padding: "15px", 
  gap: 10, 
  background: "#050037",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  flexShrink: 0
};

const inputStyle = { 
  flex: 1, 
  padding: "12px 15px", 
  borderRadius: 12, 
  border: "1px solid rgba(255,255,255,0.2)", 
  outline: "none", 
  fontSize: 14, 
  background: "#fff", 
  color: "#000" 
};

const sendButtonStyle = (isSmallScreen) => ({ 
  padding: isSmallScreen ? "10px 15px" : "12px 20px", 
  borderRadius: 12, 
  border: "none", 
  background: "#2563eb", 
  color: "#fff", 
  cursor: "pointer", 
  display: "flex", 
  alignItems: "center",
  transition: "background 0.2s"
});

export default AIChatPanel;