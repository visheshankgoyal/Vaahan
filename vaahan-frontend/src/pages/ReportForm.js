import React, { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    vehicleNumber: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reports", formData);
      toast.success("Report submitted successfully");
      setFormData({
        description: "",
        location: "",
        vehicleNumber: "",
        imageUrl: "",
      });
    } catch (err) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Report Traffic Violation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Violation Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
