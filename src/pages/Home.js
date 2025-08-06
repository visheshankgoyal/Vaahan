import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div className="jumbotron jumbotron-fluid bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 font-weight-bold">Welcome to VAAHAN</h1>
          <p className="lead">
            A community-powered portal to report and review traffic violations. 
            Be a responsible citizen and help make our roads safer!
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-light btn-lg mr-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <h5 className="card-title">Report Violations</h5>
                <p className="card-text">
                  Easily report traffic violations with photos and detailed descriptions. 
                  Help authorities maintain road safety.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="fas fa-shield-alt fa-3x text-success mb-3"></i>
                <h5 className="card-title">Community Safety</h5>
                <p className="card-text">
                  Join a community of responsible citizens working together 
                  to create safer roads for everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <i className="fas fa-chart-line fa-3x text-info mb-3"></i>
                <h5 className="card-title">Track Progress</h5>
                <p className="card-text">
                  Monitor the status of your reports and see how your contributions 
                  are making a difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row">
            <div className="col-md-3 text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="h3 text-primary">1</span>
              </div>
              <h5>Register</h5>
              <p>Create your account and verify your identity</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="h3 text-primary">2</span>
              </div>
              <h5>Report</h5>
              <p>Submit violation reports with evidence</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="h3 text-primary">3</span>
              </div>
              <h5>Review</h5>
              <p>Experts review and validate reports</p>
            </div>
            <div className="col-md-3 text-center mb-4">
              <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="h3 text-primary">4</span>
              </div>
              <h5>Action</h5>
              <p>Authorities take appropriate action</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container my-5 text-center">
        <h3>Ready to make a difference?</h3>
        <p className="lead">Join thousands of citizens working towards safer roads.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Start Reporting Today
        </Link>
      </div>
    </div>
  );
};

export default Home;
