import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    approvedReports: 0,
    rejectedReports: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, reportsRes] = await Promise.all([
        api.get("/reports/user/stats"),
        api.get("/reports/user/recent")
      ]);
      
      setStats(statsRes.data);
      setRecentReports(reportsRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "badge-warning",
      APPROVED: "badge-success", 
      REJECTED: "badge-danger",
      UNDER_REVIEW: "badge-info"
    };
    return `badge ${badges[status] || 'badge-secondary'}`;
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
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2 className="card-title">
                <i className="fas fa-user mr-2"></i>
                Welcome back, {user?.firstName || user?.username}!
              </h2>
              <p className="card-text">
                Track your violation reports and contribute to road safety.
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
              <i className="fas fa-clipboard-list fa-2x text-primary mb-2"></i>
              <h5 className="card-title">{stats.totalReports}</h5>
              <p className="card-text">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-clock fa-2x text-warning mb-2"></i>
              <h5 className="card-title">{stats.pendingReports}</h5>
              <p className="card-text">Pending</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
              <h5 className="card-title">{stats.approvedReports}</h5>
              <p className="card-text">Approved</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-times-circle fa-2x text-danger mb-2"></i>
              <h5 className="card-title">{stats.rejectedReports}</h5>
              <p className="card-text">Rejected</p>
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
                  <Link to="/report" className="btn btn-primary btn-lg btn-block">
                    <i className="fas fa-plus mr-2"></i>
                    Report New Violation
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/my-reports" className="btn btn-outline-primary btn-lg btn-block">
                    <i className="fas fa-list mr-2"></i>
                    View All Reports
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-history mr-2"></i>
                Recent Reports
              </h5>
            </div>
            <div className="card-body">
              {recentReports.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No reports yet. Start by reporting a violation!</p>
                  <Link to="/report" className="btn btn-primary">
                    Report Violation
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Violation Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report) => (
                        <tr key={report.id}>
                          <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                          <td>{report.location}</td>
                          <td>{report.violationType?.replace(/_/g, ' ')}</td>
                          <td>
                            <span className={getStatusBadge(report.status)}>
                              {report.status}
                            </span>
                          </td>
                          <td>
                            <Link 
                              to={`/my-reports/${report.id}`} 
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View
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
    </div>
  );
};

export default UserDashboard;
