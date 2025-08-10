import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
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
      
      if (res.data.success) {
        const token = res.data.data.token;
        const userData = {
          username: credentials.username,
          // You can decode the JWT token to get user role and other info
          // For now, we'll fetch user details separately if needed
        };
        
        login(userData, token);
        toast.success("Login successful!");
        
        // Decode JWT token to get user role and redirect accordingly
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          
          const decodedToken = JSON.parse(jsonPayload);
          let userRole = "USER"; // Default role
          
          if (decodedToken.authorities && decodedToken.authorities.length > 0) {
            const roleAuthority = decodedToken.authorities.find(auth => 
              auth.authority && auth.authority.startsWith('ROLE_')
            );
            if (roleAuthority) {
              userRole = roleAuthority.authority.replace('ROLE_', '');
            }
          }
          
          // Redirect based on user role
          switch (userRole) {
            case 'ADMIN':
              navigate("/admin");
              break;
            case 'REVIEWER':
              navigate("/reviewer");
              break;
            case 'USER':
            default:
              navigate("/dashboard");
              break;
          }
        } catch (tokenError) {
          console.error("Error decoding token:", tokenError);
          // Fallback to default dashboard
          navigate("/dashboard");
        }
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Login failed. Please check your credentials.";
      toast.error(errorMessage);
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
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">
                    <i className="fas fa-user mr-1"></i>
                    Username or Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username or email"
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
                <h6 className="text-muted">Account Types:</h6>
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
