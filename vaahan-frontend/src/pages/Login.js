import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "USER" // Default role
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post("/auth/login", credentials);
      login(res.data.user, res.data.token);
      toast.success("Login successful!");

      // Navigate based on user role
      if (res.data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.user.role === "REVIEWER") {
        navigate("/reviewer");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="fas fa-sign-in-alt fa-3x text-primary mb-3"></i>
                <h2 className="card-title">Login to VAAHAN</h2>
                <p className="text-muted">Choose your role and sign in</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="role">
                    <i className="fas fa-user-tag mr-1"></i>
                    Login As
                  </label>
                  <select
                    className="form-control"
                    id="role"
                    name="role"
                    value={credentials.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="USER">👤 Citizen User</option>
                    <option value="REVIEWER">🔍 Traffic Reviewer</option>
                    <option value="ADMIN">⚙️ System Administrator</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="username">
                    <i className="fas fa-user mr-1"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fas fa-lock mr-1"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Login
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-2">
                  Don't have an account?{" "}
                  <a href="/register" className="text-primary">Register here</a>
                </p>
                <p className="mb-0">
                  <a href="/forgot-password" className="text-muted">Forgot Password?</a>
                </p>
              </div>

              {/* Role Information */}
              <div className="mt-4">
                <h6 className="text-muted">Role Information:</h6>
                <div className="small">
                  <div className="mb-2">
                    <strong>👤 Citizen User:</strong> Report traffic violations and track your reports
                  </div>
                  <div className="mb-2">
                    <strong>🔍 Traffic Reviewer:</strong> Review and validate submitted reports
                  </div>
                  <div className="mb-2">
                    <strong>⚙️ System Administrator:</strong> Manage users and oversee the platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
