import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ReviewReports = () => {
  const [reports, setReports] = useState([]);

  const fetchPendingReports = async () => {
    try {
      const response = await api.get("/reviewer/reports/pending");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const handleReview = async (id, status) => {
    try {
      await api.post(`/reviewer/reports/${id}/review`, { status });
      toast.success("Review updated");
      fetchPendingReports();
    } catch (error) {
      toast.error("Failed to update review");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Pending Reports for Review</h2>
      {reports.map((report) => (
        <div key={report.id} className="border rounded p-4 mb-4 shadow">
          <p>
            <strong>Vehicle:</strong> {report.vehicleNumber}
          </p>
          <p>
            <strong>Location:</strong> {report.location}
          </p>
          <p>
            <strong>Description:</strong> {report.description}
          </p>
          <div className="space-x-2 mt-2">
            <button
              onClick={() => handleReview(report.id, "APPROVED")}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleReview(report.id, "REJECTED")}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewReports;
