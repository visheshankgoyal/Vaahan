import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      // Get current user's profile data
      const response = await api.get("/api/user/profile");
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        toast.error("Failed to load profile data");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 text-center">
                <i className="fas fa-user-circle mr-2"></i>User Profile
              </h2>
            </div>
            <div className="card-body">
              {userData ? (
                <div className="row">
                  <div className="col-md-6">
                    <div className="text-center mb-4">
                      <div className="avatar-placeholder">
                        <i className="fas fa-user fa-4x text-muted"></i>
                      </div>
                      <h4 className="mt-2">{userData.firstName} {userData.lastName}</h4>
                      <span className={`badge badge-${getRoleBadge(userData.role)}`}>
                        {userData.role}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Username:</strong>
                        <span>{userData.username}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Email:</strong>
                        <span>{userData.email}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Phone:</strong>
                        <span>{userData.phone || 'Not provided'}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>First Name:</strong>
                        <span>{userData.firstName}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Last Name:</strong>
                        <span>{userData.lastName}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Account Status:</strong>
                        <span className={`badge badge-${getStatusBadge(userData.accountStatus)}`}>
                          {userData.accountStatus}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <strong>Member Since:</strong>
                        <span>{new Date(userData.createdAt).toLocaleDateString()}</span>
                      </li>
                      {userData.role === 'USER' && (
                        <>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Total Reports:</strong>
                            <span>{userData.totalReports || 0}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Valid Reports:</strong>
                            <span>{userData.totalValidReports || 0}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>VCoins Balance:</strong>
                            <span>{userData.vCoins || 0}</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted">Profile data not available</p>
                </div>
              )}
              
              <div className="text-center mt-4">
                <button className="btn btn-outline-primary mr-2">
                  <i className="fas fa-edit mr-1"></i>
                  Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="fas fa-key mr-1"></i>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getRoleBadge = (role) => {
  const badges = {
    USER: 'primary',
    ADMIN: 'danger',
    REVIEWER: 'warning'
  };
  return badges[role] || 'secondary';
};

const getStatusBadge = (status) => {
  const badges = {
    ACTIVE: 'success',
    INACTIVE: 'secondary',
    SUSPENDED: 'danger'
  };
  return badges[status] || 'secondary';
};

export default Profile;
