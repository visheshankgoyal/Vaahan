import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    totalUsers: 0,
    totalReviewers: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, reportsRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/reports/recent")
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
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h2 className="card-title">
                <i className="fas fa-shield-alt mr-2"></i>
                Admin Dashboard
              </h2>
              <p className="card-text">
                Welcome back, {user?.firstName || user?.username}! Manage the VAAHAN platform.
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
              <p className="card-text">Pending Reports</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-users fa-2x text-success mb-2"></i>
              <h5 className="card-title">{stats.totalUsers}</h5>
              <p className="card-text">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <i className="fas fa-user-check fa-2x text-info mb-2"></i>
              <h5 className="card-title">{stats.totalReviewers}</h5>
              <p className="card-text">Reviewers</p>
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
                <i className="fas fa-cogs mr-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <Link to="/admin/reports" className="btn btn-primary btn-lg btn-block">
                    <i className="fas fa-list mr-2"></i>
                    Manage Reports
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/admin/users" className="btn btn-success btn-lg btn-block">
                    <i className="fas fa-users mr-2"></i>
                    Manage Users
                  </Link>
                </div>
                <div className="col-md-4 mb-3">
                  <Link to="/admin/reviewers" className="btn btn-info btn-lg btn-block">
                    <i className="fas fa-user-check mr-2"></i>
                    Manage Reviewers
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
                  <p className="text-muted">No reports available.</p>
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
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report) => (
                        <tr key={report.id}>
                          <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                          <td>{report.reporter?.username || 'Unknown'}</td>
                          <td>{report.location}</td>
                          <td>{report.violationType?.replace(/_/g, ' ')}</td>
                          <td>
                            <span className={getStatusBadge(report.status)}>
                              {report.status}
                            </span>
                          </td>
                          <td>
                            <Link 
                              to={`/admin/reports/${report.id}`} 
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

      {/* System Info */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-info-circle mr-2"></i>
                System Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6>Platform Status</h6>
                  <ul className="list-unstyled">
                    <li><i className="fas fa-check-circle text-success mr-2"></i>System Online</li>
                    <li><i className="fas fa-check-circle text-success mr-2"></i>Database Connected</li>
                    <li><i className="fas fa-check-circle text-success mr-2"></i>File Storage Active</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Recent Activity</h6>
                  <ul className="list-unstyled">
                    <li><i className="fas fa-clock text-info mr-2"></i>Last report: {stats.totalReports > 0 ? 'Today' : 'No reports yet'}</li>
                    <li><i className="fas fa-users text-info mr-2"></i>Active users: {stats.totalUsers}</li>
                    <li><i className="fas fa-chart-line text-info mr-2"></i>Reports this month: {stats.totalReports}</li>
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

export default AdminDashboard;
