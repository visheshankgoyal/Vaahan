import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ReviewReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reviewComment, setReviewComment] = useState("");

  const fetchPendingReports = async () => {
    try {
      const response = await api.get("/reviewer/reports/pending");
      setReports(response.data);
    } catch (error) {
      toast.error("Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const handleReview = async (id, status) => {
    if (status === "REQUEST_MORE_INFO" && !reviewComment.trim()) {
      toast.error("Please provide a comment when requesting more information");
      return;
    }

    try {
      await api.post(`/reviewer/reports/${id}/review`, { 
        status,
        comment: reviewComment 
      });
      toast.success(`Report ${status.toLowerCase()} successfully`);
      setReviewComment("");
      setSelectedReport(null);
      fetchPendingReports();
    } catch (error) {
      toast.error("Failed to update review");
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
                <i className="fas fa-clipboard-check mr-2"></i>
                Pending Reports for Review ({reports.length})
              </h3>
            </div>
            <div className="card-body">
              {reports.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                  <p className="text-muted">No pending reports to review!</p>
                </div>
              ) : (
                <div className="row">
                  {reports.map((report) => (
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
                          <p className="card-text small text-muted">
                            <i className="fas fa-user mr-1"></i>
                            Reported by: {report.reporter?.username || 'Unknown'}
                          </p>
                        </div>
                        <div className="card-footer">
                          <div className="d-flex justify-content-between mb-2">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedReport(report)}
                            >
                              <i className="fas fa-eye mr-1"></i>
                              View Details
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-info"
                              onClick={() => window.open(`/reports/${report.id}`, '_blank')}
                            >
                              <i className="fas fa-image mr-1"></i>
                              View Evidence
                            </button>
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="btn-group btn-group-sm w-100" role="group">
                            <button
                              onClick={() => handleReview(report.id, "APPROVED")}
                              className="btn btn-success"
                              title="Approve Report"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              onClick={() => handleReview(report.id, "REJECTED")}
                              className="btn btn-danger"
                              title="Reject Report"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedReport(report);
                                setReviewComment("");
                              }}
                              className="btn btn-warning"
                              title="Request More Info"
                            >
                              <i className="fas fa-question"></i>
                            </button>
                            <button
                              onClick={() => handleReview(report.id, "ESCALATE")}
                              className="btn btn-dark"
                              title="Escalate to Admin"
                            >
                              <i className="fas fa-arrow-up"></i>
                            </button>
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

      {/* Review Modal */}
      {selectedReport && (
        <div className="modal fade show" style={{display: 'block'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-clipboard-check mr-2"></i>
                  Review Report
                </h5>
                <button 
                  type="button" 
                  className="close" 
                  onClick={() => setSelectedReport(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <h6>Report Details</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Location:</strong></td>
                          <td>{selectedReport.location}</td>
                        </tr>
                        <tr>
                          <td><strong>Violation Type:</strong></td>
                          <td>{selectedReport.violationType?.replace(/_/g, ' ')}</td>
                        </tr>
                        <tr>
                          <td><strong>Severity:</strong></td>
                          <td>
                            <span className={getSeverityBadge(selectedReport.severity)}>
                              {selectedReport.severity}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Vehicle Number:</strong></td>
                          <td>{selectedReport.vehicleNumber || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td><strong>Description:</strong></td>
                          <td>{selectedReport.description}</td>
                        </tr>
                        <tr>
                          <td><strong>Reporter:</strong></td>
                          <td>{selectedReport.reporter?.username}</td>
                        </tr>
                        <tr>
                          <td><strong>Date:</strong></td>
                          <td>{new Date(selectedReport.createdAt).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-4">
                    <h6>Review Actions</h6>
                    <div className="d-grid gap-2">
                      <button
                        onClick={() => handleReview(selectedReport.id, "APPROVED")}
                        className="btn btn-success btn-sm"
                      >
                        <i className="fas fa-check mr-1"></i>
                        Approve
                      </button>
                      <button
                        onClick={() => handleReview(selectedReport.id, "REJECTED")}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fas fa-times mr-1"></i>
                        Reject
                      </button>
                      <button
                        onClick={() => handleReview(selectedReport.id, "ESCALATE")}
                        className="btn btn-dark btn-sm"
                      >
                        <i className="fas fa-arrow-up mr-1"></i>
                        Escalate
                      </button>
                    </div>
                    
                    <div className="mt-3">
                      <label htmlFor="reviewComment">Review Comment:</label>
                      <textarea
                        className="form-control"
                        id="reviewComment"
                        rows="3"
                        placeholder="Add your review comment..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      ></textarea>
                      <button
                        onClick={() => handleReview(selectedReport.id, "REQUEST_MORE_INFO")}
                        className="btn btn-warning btn-sm mt-2"
                        disabled={!reviewComment.trim()}
                      >
                        <i className="fas fa-question mr-1"></i>
                        Request More Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {selectedReport && (
        <div 
          className="modal-backdrop fade show" 
          onClick={() => setSelectedReport(null)}
        ></div>
      )}
    </div>
  );
};

export default ReviewReports;
