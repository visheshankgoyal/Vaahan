import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ReviewerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAssigned: 0,
    pendingReviews: 0,
    completedToday: 0,
    averageReviewTime: 0
  });
  const [pendingReports, setPendingReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // For now, we'll use mock data since the API endpoints don't exist yet
      // TODO: Replace with actual API calls when endpoints are implemented
      
      // Mock data for demonstration
      const mockStats = {
        totalAssigned: 0,
        pendingReviews: 0,
        completedToday: 0,
        averageReviewTime: 0
      };
      
      const mockPendingReports = [];
      
      setStats(mockStats);
      setPendingReports(mockPendingReports);
      
      // Uncomment when API endpoints are ready:
      // const [statsRes, reportsRes] = await Promise.all([
      //   api.get("/reviewer/stats"),
      //   api.get("/reviewer/pending-reports")
      // ]);
      // setStats(statsRes.data.data || statsRes.data);
      // setPendingReports(reportsRes.data.data || reportsRes.data);
      
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      // Set default values on error
      setStats({
        totalAssigned: 0,
        pendingReviews: 0,
        completedToday: 0,
        averageReviewTime: 0
      });
      setPendingReports([]);
      toast.error("Failed to load dashboard data. Using default values.");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      LOW: "badge-success",
      MEDIUM: "badge-warning", 
      HIGH: "badge-danger"
    };
    return `badge ${badges[severity] || 'badge-secondary'}`;
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h2 className="card-title">
                <i className="fas fa-user-check mr-2"></i>
                Reviewer Dashboard
              </h2>
              <p className="card-text">
                Welcome back, {user?.firstName || user?.username}! Review and validate violation reports.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-tasks fa-2x text-primary mb-2"></i>
              <h5 className="card-title">{stats.totalAssigned}</h5>
              <p className="card-text">Total Assigned</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-clock fa-2x text-warning mb-2"></i>
              <h5 className="card-title">{stats.pendingReviews}</h5>
              <p className="card-text">Pending Reviews</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <h5 className="card-title">{stats.completedToday}</h5>
              <p className="card-text">Completed Today</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-stopwatch fa-2x text-info mb-2"></i>
              <h5 className="card-title">{stats.averageReviewTime}min</h5>
              <p className="card-text">Avg Review Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-bolt mr-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Link to="/review" className="btn btn-primary btn-lg btn-block">
                    <i className="fas fa-eye mr-2"></i>
                    Review Reports
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/reviewer/history" className="btn btn-outline-primary btn-lg btn-block">
                    <i className="fas fa-history mr-2"></i>
                    Review History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Reports */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Pending Reviews ({pendingReports.length})
              </h5>
            </div>
            <div className="card-body">
              {pendingReports.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                  <p className="text-muted">No pending reviews! Great job!</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Reporter</th>
                        <th>Location</th>
                        <th>Violation Type</th>
                        <th>Severity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingReports.map((report) => (
                        <tr key={report.id}>
                          <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                          <td>{report.reporter?.username || 'Unknown'}</td>
                          <td>{report.location}</td>
                          <td>{report.violationType?.replace(/_/g, ' ')}</td>
                          <td>
                            <span className={getSeverityBadge(report.severity)}>
                              {report.severity}
                            </span>
                          </td>
                          <td>
                            <Link 
                              to={`/review/${report.id}`} 
                              className="btn btn-sm btn-primary"
                            >
                              <i className="fas fa-eye mr-1"></i>
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Guidelines */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-book mr-2"></i>
                Review Guidelines
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>What to Check:</h6>
                  <ul>
                    <li>Clear evidence of violation</li>
                    <li>Proper image quality and visibility</li>
                    <li>Accurate location and time details</li>
                    <li>Appropriate violation type classification</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Review Actions:</h6>
                  <ul>
                    <li><strong>Approve:</strong> Valid violation with clear evidence</li>
                    <li><strong>Reject:</strong> Insufficient evidence or false report</li>
                    <li><strong>Request More Info:</strong> Need additional details</li>
                    <li><strong>Escalate:</strong> Serious violations requiring admin attention</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerDashboard;
