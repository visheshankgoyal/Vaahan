import React, { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  if (!username) {
    navigate("/register");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post("/auth/verify-otp", { username, otp });
      toast.success("Account verified successfully! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed. Please check your OTP and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await api.post("/auth/resend-otp", { username });
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

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
                  We've sent a verification code to your email and phone number.
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control form-control-lg text-center"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    required
                    style={{fontSize: '1.2rem', letterSpacing: '0.5rem'}}
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-success btn-lg btn-block"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check mr-2"></i>
                      Verify Account
                    </>
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p className="text-muted mb-2">Didn't receive the OTP?</p>
                <button 
                  onClick={handleResendOTP}
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="fas fa-redo mr-1"></i>
                  Resend OTP
                </button>
              </div>
              
              <div className="alert alert-info mt-4">
                <i className="fas fa-info-circle mr-2"></i>
                <strong>Note:</strong> The OTP is valid for 10 minutes. 
                Check your email and SMS for the verification code.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
