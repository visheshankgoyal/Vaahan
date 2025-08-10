import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded p-4 shadow">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserManagement;
