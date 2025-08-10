import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      // The API returns { success: true, data: { users: [...] } }
      if (response.data.success && response.data.data) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
        toast.error("Failed to load users");
      }
    } catch (err) {
      console.error("Error fetching users", err);
      setUsers([]);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
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
              <h2 className="mb-0">
                <i className="fas fa-users mr-2"></i>
                Manage Users
              </h2>
            </div>
            <div className="card-body">
              {users.length === 0 ? (
                <div className="text-center py-4">
                  <i className="fas fa-users fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No users found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.userId || user.id}>
                          <td>{user.userId || user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>
                            <span className={`badge badge-${getRoleBadge(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>
                            <span className={`badge badge-${getStatusBadge(user.accountStatus)}`}>
                              {user.accountStatus}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary mr-2">
                              <i className="fas fa-edit mr-1"></i>
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-trash mr-1"></i>
                              Delete
                            </button>
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

export default AdminUserManagement;
