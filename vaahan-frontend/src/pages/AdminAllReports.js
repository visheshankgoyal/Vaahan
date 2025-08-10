import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AdminAllReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api
      .get("/admin/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Error fetching reports", err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Submitted Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border rounded p-4 shadow">
            <p>
              <strong>Vehicle:</strong> {report.vehicleNumber}
            </p>
            <p>
              <strong>Location:</strong> {report.location}
            </p>
            <p>
              <strong>Description:</strong> {report.description}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>
            <p>
              <strong>Submitted by:</strong> {report.user?.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllReports;
