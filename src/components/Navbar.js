import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">
          VAAHAN
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && user.role === "USER" && (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/report" className="nav-link">Report</Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-reports" className="nav-link">My Reports</Link>
                </li>
              </>
            )}
            {isLoggedIn && user.role === "REVIEWER" && (
              <>
                <li className="nav-item">
                  <Link to="/reviewer" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/review" className="nav-link">Review</Link>
                </li>
              </>
            )}
            {isLoggedIn && user.role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/reports" className="nav-link">All Reports</Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/users" className="nav-link">Users</Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger ml-2">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
