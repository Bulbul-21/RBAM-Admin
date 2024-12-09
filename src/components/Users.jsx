import React, { useState, useEffect } from "react";
import "../Styles/Users.css";

const Users = () => {
  // Fetch roles from localStorage and use them in the dropdown
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      const parsedRoles = JSON.parse(storedRoles);
      const roleOptions = parsedRoles.map((role) => role.role); // Extract roles
      setRoles(roleOptions);
    }
  }, []);

  // Load users from localStorage on component mount or initialize as an empty array
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active",
    role: "User",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleFormSubmit = () => {
    if (editIndex !== null) {
      // Edit existing user
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
    } else {
      // Add new user
      setUsers([...users, formData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", status: "Active", role: "User" });
    setEditIndex(null);
    setFormVisible(false);
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleToggleStatus = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status =
      updatedUsers[index].status === "Active" ? "Inactive" : "Active";
    setUsers(updatedUsers);
  };
  

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Users</h2>
        <button onClick={() => setFormVisible(true)}>+ Add User</button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          fill="#888"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.16 5.01 12.76 3 9.99 3 7.24 3 5 5.24 5 8s2.24 5 5 5c1.61 0 3.05-.77 3.99-1.96l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-5.5 0C8.01 14 6 11.99 6 9s2.01-5 4.5-5S15 6.01 15 9s-2.01 5-4.5 5z" />
        </svg>
      </div>

      {isFormVisible && (
        <div className="form-overlay">
          <div className="user-form">
            <h3>{editIndex !== null ? "Edit User" : "Add User"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="form-buttons">
              <button className="add-user-btn" onClick={handleFormSubmit}>
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button className="close-btn" onClick={resetForm}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={user.status.toLowerCase()}>{user.status}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="toggle-btn"
                    onClick={() => handleToggleStatus(index)}
                    style={{
                      backgroundColor:
                        user.status === "Active" ? "#d9534f" : "#5cb85c",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      marginRight: "5px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                    disabled={user.status === "Inactive"}
                    style={{
                      cursor:
                        user.status === "Inactive" ? "not-allowed" : "pointer",
                      opacity: user.status === "Inactive" ? 0.5 : 1,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                    disabled={user.status === "Inactive"}
                    style={{
                      cursor:
                        user.status === "Inactive" ? "not-allowed" : "pointer",
                      opacity: user.status === "Inactive" ? 0.5 : 1,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-results">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
