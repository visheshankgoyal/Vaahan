import React, { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "USER" // Default role
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post("/auth/register", formData);
      toast.success("Registration successful! Please verify your account.");
      setStep(2); // Move to OTP verification step
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await api.post("/auth/resend-otp", { username: formData.username });
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleBackToRegister = () => {
    setStep(1);
  };

  if (step === 2) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <div className="text-center mb-4">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h2 className="card-title">Verify Your Account</h2>
                  <p className="text-muted">
                    We've sent verification codes to your email and phone number.
                  </p>
                </div>
                
                <div className="alert alert-info">
                  <i className="fas fa-info-circle mr-2"></i>
                  <strong>Account Details:</strong><br/>
                  <strong>Username:</strong> {formData.username}<br/>
                  <strong>Email:</strong> {formData.email}<br/>
                  <strong>Phone:</strong> {formData.phone}<br/>
                  <strong>Role:</strong> {formData.role}
                </div>

                <div className="text-center">
                  <button 
                    onClick={handleBackToRegister}
                    className="btn btn-outline-secondary btn-sm mb-3"
                  >
                    <i className="fas fa-arrow-left mr-1"></i>
                    Back to Registration
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-muted mb-2">Check your email and SMS for verification codes</p>
                  <button 
                    onClick={handleResendOTP}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Resend Verification Codes
                  </button>
                </div>

                <div className="alert alert-success mt-4">
                  <i className="fas fa-check-circle mr-2"></i>
                  <strong>Next Steps:</strong><br/>
                  1. Check your email for verification link<br/>
                  2. Check your phone for SMS verification code<br/>
                  3. Click the verification link or enter the code<br/>
                  4. Once verified, you can login to your account
                </div>

                <div className="text-center mt-4">
                  <a href="/login" className="btn btn-primary">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Go to Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
                <h2 className="card-title">Register for VAAHAN</h2>
                <p className="text-muted">Create your account and choose your role</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="form-group">
                  <label htmlFor="role">
                    <i className="fas fa-user-tag mr-1"></i>
                    Register As *
                  </label>
                  <select
                    className="form-control"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="USER">👤 Citizen User - Report traffic violations</option>
                    <option value="REVIEWER">🔍 Traffic Reviewer - Review reports (Admin approval required)</option>
                    <option value="ADMIN">⚙️ System Administrator - Manage platform (Special access required)</option>
                  </select>
                  <small className="form-text text-muted">
                    {formData.role === "USER" && "Report traffic violations and track your submissions"}
                    {formData.role === "REVIEWER" && "Review and validate submitted violation reports"}
                    {formData.role === "ADMIN" && "Manage users, reports, and system administration"}
                  </small>
                </div>

                {/* Personal Information */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        <i className="fas fa-user mr-1"></i>
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">
                        <i className="fas fa-user mr-1"></i>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="username">
                    <i className="fas fa-at mr-1"></i>
                    Username *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Choose a unique username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope mr-1"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <small className="form-text text-muted">
                    Verification link will be sent to this email
                  </small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone mr-1"></i>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <small className="form-text text-muted">
                    SMS verification code will be sent to this number
                  </small>
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fas fa-lock mr-1"></i>
                    Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <small className="form-text text-muted">
                    Password must be at least 6 characters long
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-lock mr-1"></i>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus mr-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p className="mb-0">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">Login here</a>
                </p>
              </div>

              {/* Registration Info */}
              <div className="alert alert-info mt-4">
                <i className="fas fa-info-circle mr-2"></i>
                <strong>Registration Process:</strong><br/>
                1. Fill in your details and choose your role<br/>
                2. Submit the form to create your account<br/>
                3. Verify your email and phone number<br/>
                4. Login with your credentials
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
