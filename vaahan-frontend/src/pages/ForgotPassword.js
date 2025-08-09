import React, { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email!");
      setSubmitted(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <i className="fas fa-envelope-open fa-3x text-success mb-3"></i>
                <h3 className="card-title">Check Your Email</h3>
                <p className="text-muted">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="alert alert-info">
                  <i className="fas fa-info-circle mr-2"></i>
                  <strong>Next Steps:</strong>
                  <br />
                  1. Check your email inbox
                  <br />
                  2. Click the password reset link
                  <br />
                  3. Create a new password
                  <br />
                  4. Login with your new password
                </div>
                <Link to="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Back to Login
                </Link>
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
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="fas fa-key fa-3x text-primary mb-3"></i>
                <h2 className="card-title">Forgot Password?</h2>
                <p className="text-muted">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope mr-1"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary">
                    Login here
                  </Link>
                </p>
              </div>

              <div className="alert alert-info mt-4">
                <i className="fas fa-info-circle mr-2"></i>
                <strong>Note:</strong> The password reset link will expire in 1
                hour for security reasons.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
