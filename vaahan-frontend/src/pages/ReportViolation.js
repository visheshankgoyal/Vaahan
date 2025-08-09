import React, { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const ReportViolation = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    violationType: "",
    vehicleNumber: "",
    severity: "LOW"
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const violationTypes = [
    "SPEEDING",
    "RED_LIGHT_VIOLATION", 
    "PARKING_VIOLATION",
    "DRUNK_DRIVING",
    "OVERLOADING",
    "NO_HELMET",
    "NO_SEATBELT",
    "OTHER"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.location || !formData.description || !formData.violationType) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload an image as evidence!");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    submitData.append("location", formData.location);
    submitData.append("description", formData.description);
    submitData.append("violationType", formData.violationType);
    submitData.append("vehicleNumber", formData.vehicleNumber);
    submitData.append("severity", formData.severity);
    submitData.append("image", imageFile);

    try {
      await api.post("/reports", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Violation reported successfully!");
      
      // Reset form
      setFormData({
        location: "",
        description: "",
        violationType: "",
        vehicleNumber: "",
        severity: "LOW"
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Report Traffic Violation
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="location">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        Location *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        placeholder="Enter violation location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="vehicleNumber">
                        <i className="fas fa-car mr-1"></i>
                        Vehicle Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="vehicleNumber"
                        name="vehicleNumber"
                        placeholder="Enter vehicle number (if known)"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="violationType">
                        <i className="fas fa-list mr-1"></i>
                        Violation Type *
                      </label>
                      <select
                        className="form-control"
                        id="violationType"
                        name="violationType"
                        value={formData.violationType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select violation type</option>
                        {violationTypes.map(type => (
                          <option key={type} value={type}>
                            {type.replace(/_/g, ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="severity">
                        <i className="fas fa-exclamation-circle mr-1"></i>
                        Severity Level
                      </label>
                      <select
                        className="form-control"
                        id="severity"
                        name="severity"
                        value={formData.severity}
                        onChange={handleChange}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">
                    <i className="fas fa-comment mr-1"></i>
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Provide detailed description of the violation..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="image">
                    <i className="fas fa-camera mr-1"></i>
                    Evidence Image *
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="img-thumbnail" 
                        style={{maxHeight: '200px'}}
                      />
                    </div>
                  )}
                </div>

                <div className="alert alert-info">
                  <i className="fas fa-info-circle mr-2"></i>
                  <strong>Note:</strong> Please ensure you have proper evidence and are reporting genuine violations. 
                  False reports may result in account suspension.
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span>
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Report
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViolation;
