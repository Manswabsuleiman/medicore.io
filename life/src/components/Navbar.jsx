import React, { useState } from "react";
import "./Navbar.css";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo">
          <img
            src="/Pictures/favicon.png"
            alt="Medical Logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <span>Medicore.io</span>
        </div>

        {/* Updated list with dynamic class */}
        <ul className={isMobile ? "navbar-links-mobile" : "navbar-links"} 
            onClick={() => setIsMobile(false)}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/solutions">Solutions</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/appointment" className="appointment-link">
              Appointment
            </Link>
          </li>
          
          {/* Auth buttons moved inside menu for mobile */}
          <li className="mobile-only-auth">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="signin-btn">Sign In</button>
              </SignInButton>
            </SignedOut>
          </li>
        </ul>

        <div className="navbar-auth-desktop">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="signin-btn">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Hamburger Icon */}
        <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;