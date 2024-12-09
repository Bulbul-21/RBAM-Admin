import React, { useState, useEffect } from "react";
import "../Styles/Roles.css";

const Roles = () => {
  const predefinedRoles = ["Admin", "Editor", "Viewer"];
  const predefinedPermissions = ["Read", "Write", "Execute"];

  const [roles, setRoles] = useState(() => {
    const storedRoles = localStorage.getItem("roles");
    return storedRoles ? JSON.parse(storedRoles) : [];
  });

  const [formData, setFormData] = useState({
    role: "",
    permissions: "",
    isCustomRole: false,
    isCustomPermission: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === "Other") {
      setFormData({ ...formData, role: "", isCustomRole: true });
    } else {
      setFormData({ ...formData, role: selectedRole, isCustomRole: false });
    }
  };

  const handlePermissionChange = (e) => {
    const selectedPermission = e.target.value;
    if (selectedPermission === "Other") {
      setFormData({ ...formData, permissions: "", isCustomPermission: true });
    } else {
      setFormData({
        ...formData,
        permissions: selectedPermission,
        isCustomPermission: false,
      });
    }
  };

  const handleAddRole = () => {
    if (!formData.role.trim() || !formData.permissions.trim()) {
      setErrorMessage("Please fill in both role and permissions.");
      return;
    }

    const isDuplicate = roles.some(
      (role) =>
        role.role === formData.role && role.permissions === formData.permissions
    );
    if (isDuplicate && editingIndex === null) {
      setErrorMessage("Role with these permissions already exists.");
      return;
    }

    if (editingIndex === null) {
      setRoles([...roles, formData]);
    } else {
      const updatedRoles = roles.map((role, index) =>
        index === editingIndex ? formData : role
      );
      setRoles(updatedRoles);
    }

    resetForm();
  };

  const handleDelete = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
  };

  const handleEdit = (index) => {
    const roleToEdit = roles[index];
    setFormData({
      ...roleToEdit,
      isCustomRole: !predefinedRoles.includes(roleToEdit.role),
      isCustomPermission: !predefinedPermissions.includes(
        roleToEdit.permissions
      ),
    });
    setShowForm(true);
    setEditingIndex(index);
  };

  const resetForm = () => {
    setFormData({
      role: "",
      permissions: "",
      isCustomRole: false,
      isCustomPermission: false,
    });
    setShowForm(false);
    setEditingIndex(null);
    setErrorMessage("");
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.permissions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="roles-container">
      <div className="roles-header">
        <h2>Roles</h2>
        <button className="add-role-btn" onClick={() => setShowForm(true)}>
          + Add Role
        </button>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search roles..."
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

      {showForm && (
        <>
          <div className="overlay" onClick={resetForm}></div>
          <div className="role-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <select
              name="role"
              value={formData.isCustomRole ? "Other" : formData.role}
              onChange={handleRoleChange}
              className="dropdown"
            >
              <option value="">Select Role</option>
              {predefinedRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>

            {formData.isCustomRole && (
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Enter custom role"
                className="custom-input"
              />
            )}

            <select
              name="permissions"
              value={
                formData.isCustomPermission ? "Other" : formData.permissions
              }
              onChange={handlePermissionChange}
              className="dropdown"
            >
              <option value="">Select Permission</option>
              {predefinedPermissions.map((permission) => (
                <option key={permission} value={permission}>
                  {permission}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>

            {formData.isCustomPermission && (
              <input
                type="text"
                name="permissions"
                value={formData.permissions}
                onChange={handleInputChange}
                placeholder="Enter custom permissions"
                className="custom-input"
              />
            )}

            <div className="role-form-buttons">
              <button className="close-btn" onClick={resetForm}>
                Close
              </button>
              <button className="submit-btn" onClick={handleAddRole}>
                {editingIndex === null ? "Add Role" : "Update Role"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Roles Table */}
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-results-roles">
                No roles found.
              </td>
            </tr>
          ) : (
            filteredRoles.map((role, index) => (
              <tr key={index}>
                <td>{role.role}</td>
                <td>{role.permissions}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
