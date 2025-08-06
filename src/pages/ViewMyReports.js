import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ViewMyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get("/reports/my");
      setReports(response.data);
    } catch (error) {
      toast.error("Failed to fetch reports");
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

  const getSeverityBadge = (severity) => {
    const badges = {
      LOW: "badge-success",
      MEDIUM: "badge-warning", 
      HIGH: "badge-danger"
    };
    return `badge ${badges[severity] || 'badge-secondary'}`;
  };

  const filteredReports = reports.filter(report => {
    if (filter === "ALL") return true;
    return report.status === filter;
  });

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
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">
                <i className="fas fa-list mr-2"></i>
                My Reports ({reports.length})
              </h3>
            </div>
            <div className="card-body">
              {/* Filter */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="filter">Filter by Status:</label>
                  <select 
                    className="form-control" 
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="ALL">All Reports</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                  </select>
                </div>
              </div>

              {filteredReports.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                  <p className="text-muted">
                    {filter === "ALL" 
                      ? "No reports found. Start by reporting a violation!" 
                      : `No ${filter.toLowerCase()} reports found.`
                    }
                  </p>
                  {filter === "ALL" && (
                    <a href="/report" className="btn btn-primary">
                      <i className="fas fa-plus mr-2"></i>
                      Report Violation
                    </a>
                  )}
                </div>
              ) : (
                <div className="row">
                  {filteredReports.map((report) => (
                    <div key={report.id} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className={getStatusBadge(report.status)}>
                              {report.status}
                            </span>
                            <span className={getSeverityBadge(report.severity)}>
                              {report.severity}
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                            {report.location}
                          </h6>
                          <p className="card-text text-muted small">
                            <i className="fas fa-calendar mr-1"></i>
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                          <p className="card-text">
                            <strong>Violation:</strong> {report.violationType?.replace(/_/g, ' ')}
                          </p>
                          {report.vehicleNumber && (
                            <p className="card-text">
                              <strong>Vehicle:</strong> {report.vehicleNumber}
                            </p>
                          )}
                          <p className="card-text">
                            {report.description.length > 100 
                              ? `${report.description.substring(0, 100)}...` 
                              : report.description
                            }
                          </p>
                          {report.reviewer && (
                            <p className="card-text small text-muted">
                              <i className="fas fa-user-check mr-1"></i>
                              Reviewed by: {report.reviewer.username}
                            </p>
                          )}
                        </div>
                        <div className="card-footer">
                          <div className="d-flex justify-content-between">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => window.open(`/reports/${report.id}`, '_blank')}
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View Details
                            </button>
                            {report.status === "PENDING" && (
                              <button className="btn btn-sm btn-outline-warning">
                                <i className="fas fa-edit mr-1"></i>
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyReports;
