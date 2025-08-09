import React from "react";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">
                <i className="fas fa-user-circle mr-2"></i>Profile
              </h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Username:</strong> {user.username}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone}
                </li>
                <li className="list-group-item">
                  <strong>First Name:</strong> {user.firstName}
                </li>
                <li className="list-group-item">
                  <strong>Last Name:</strong> {user.lastName}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
