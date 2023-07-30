import React, { useState, useEffect } from "react";
import axios from "axios";
import "./users.css";
import { PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidNumber } from "libphonenumber-js";
import { FaPlus, FaEdit } from "react-icons/fa";
import { AiFillSave, AiFillDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [editedFields, setEditedFields] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const phoneValidation = usePhoneValidation(phoneNumber);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditUser = (user) => {

    setEditUser(user);
    setEditedFields({});
    setIsEditMode(true);
  };

  const handleSaveUser = async () => {
    const updatedUser = {
      username: editedFields[editUser.user_id]?.username || editUser.username,
      email: editedFields[editUser.user_id]?.email || editUser.email,
      phoneNumber:
        editedFields[editUser.user_id]?.phoneNumber || editUser.phoneNumber,
      role: editedFields[editUser.user_id]?.role || editUser.role,
    };
    const phoneNumberPattern = /^\+\d{2,3} \d{5}-\d{5}$/;
    if (!phoneNumberPattern.test(updatedUser.phoneNumber)) {
      alert(
        'Please enter a valid phone number in the format "+9x xxxxx-xxxx9".'
      );
      return;
    }

    try {
      const cookie = document.cookie;
      const token = getCookieValue(cookie, "token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/users/${editUser.user_id}`,
        updatedUser,
        config
      );

      if (
        response.status === 200 &&
        response.data.message === "User updated successfully"
      ) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.user_id === editUser.user_id ? { ...u, ...updatedUser } : u
          )
        );
        setEditUser(null);
        setIsEditMode(false);
        alert("User details updated");
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.role === "super_admin" || user.role === "admin") {
      alert("You do not have permission to delete this user.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }

    const userInput = prompt("Please type 'DELETE' to confirm deletion:");
    if (userInput !== "DELETE") {
      alert("Deletion canceled. Invalid input.");
      return;
    }

    try {
      const cookie = document.cookie;
      const token = getCookieValue(cookie, "token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/users/${user.user_id}`,
        config
      );
      if (
        response.status === 200 &&
        response.data.message === "User deleted successfully"
      ) {
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u.user_id !== user.user_id)
        );
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert(
          "Insufficient access. You do not have permission to delete this user."
        );
      } else {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user. Please try again.");
      }
    }
  };

  const handleInputChange = (e, field, user) => {
    const value = e.target.value;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [user.user_id]: {
        ...prevFields[user.user_id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isValidNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
      role: role,
    };

    try {
      const cookie = document.cookie;
      const token = getCookieValue(cookie, "token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/users/add",
        newUser,
        config
      );

      if (
        response.status === 200 &&
        response.data.message === "User added successfully"
      ) {
        setUsers([...users, newUser]);
        setShowForm(false);
        setPasswordMatch(true);
        handleFormReset();
        alert("User added successfully.");
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.detail === "Username already exists") {
          alert("Username already exists. Please choose a different username.");
        } else if (error.response.data.detail === "Email already registered") {
          alert(
            "Email already registered. Please choose a different email, or login with your username."
          );
        } else {
          alert("An error occurred while signing up. Please try again.");
        }
      } else {
        alert("An error occurred while signing up. Please try again.");
      }
    }
  };

  const handleFormReset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhoneNumber("");
    setRole("");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const goBack = () => {
    setShowForm(false);
    setPasswordMatch(true);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const getCookieValue = (cookie, name) => {
    const match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
      return match[2];
    }
    return null;
  };

  return (
    <div className="user-form2">
      {showForm ? (
        <div className="user-form2">
          <h1 className="heading">New User</h1>
          <form className="form-container2" onSubmit={addUser}>
            <div className="columns-container3">
              <div className="column1">
                <div className="row1">
                  <label htmlFor="username">
                    Username<span className="requiredfield">*</span>
                  </label>
                </div>
                <div className="row1">
                  <input
                    type="text"
                    id="username"
                    required
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="row1">
                  <label htmlFor="pass">
                    Password<span className="required-field">*</span>
                  </label>
                </div>
                <div className="row1">
                  <input
                    type="password"
                    id="pass"
                    required
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="row1">
                  <label htmlFor="mobile_code">
                    Phone No.<span className="required-field">*</span>
                  </label>
                </div>
                <div className="row1">
                  <PhoneInput
                    defaultCountry="in"
                    forceDialCode="false"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                  />
                </div>
              </div>
              <div className="column1">
                <div className="row1">
                  <label htmlFor="mail">
                    Email<span className="required-field">*</span>
                  </label>
                </div>
                <div className="row1">
                  <input
                    type="email"
                    id="mail"
                    name="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="row1">
                  <label htmlFor="confirmPass">
                    Confirm Password<span className="required-field">*</span>
                  </label>
                </div>
                <div className="row1">
                  <input
                    type="password"
                    id="confirmPass"
                    required
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e)}
                  />
                </div>
                {!passwordMatch && (
                  <div className="row1">
                    <span className="error">Passwords do not match</span>
                  </div>
                )}
                <div className="row1">
                  <label htmlFor="role">
                    Role<span className="required-field">*</span>
                  </label>
                </div>
                <div className="row1">
                  <select
                    id="role"
                    name="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="normal_user">Normal User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="agency">Agency</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-buttons-container1">
              <button className="form-submit-button1">Add User</button>
              <button className="back-button" onClick={goBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <h1 className="heading">User</h1>
          <div className="columns-container1">
            <table>
              <thead>
                <tr>
                  <th colSpan="5">
                    <div className="table-header">
                      <span>User Details</span>
                      <div className="header-buttons">
                        <button
                          className="add-user-button"
                          onClick={toggleForm}
                        >
                          <FaPlus /> Add User
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={`${user.user_id}-${index}`}>
                    <td>
                      {editUser === user ? (
                        <input
                          type="text"
                          value={
                            editedFields[user.user_id]?.username ||
                            user.username
                          }
                          onChange={(e) =>
                            handleInputChange(e, "username", user)
                          }
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td>
                      {editUser === user ? (
                        <input
                          type="text"
                          value={
                            editedFields[user.user_id]?.email || user.email
                          }
                          onChange={(e) => handleInputChange(e, "email", user)}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editUser === user ? (
                        <input
                          type="tel"
                          value={
                            editedFields[user.user_id]?.phoneNumber ||
                            user.phoneNumber
                          }
                          onChange={(e) =>
                            handleInputChange(e, "phoneNumber", user)
                          }
                          pattern="^\+\d{2,3} \d{5}-\d{5}$"
                        />
                      ) : (
                        user.phoneNumber
                      )}
                    </td>
                    <td>
                      {editUser === user ? (
                        <select
                          value={editedFields[user.user_id]?.role || user.role}
                          onChange={(e) => handleInputChange(e, "role", user)}
                        >
                          <option value="normal_user">Normal User</option>
                          <option value="admin">Admin</option>
                          <option value="super_admin">Super Admin</option>
                          <option value="agency">Agency</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {editUser === user ? (
                        <>
                          <AiFillSave
                            className="save-button"
                            onClick={handleSaveUser}
                          />
                          <IoMdClose
                            className="cancel-button"
                            onClick={() => setEditUser(null)}
                          />
                        </>
                      ) : (
                        <>
                          <FaEdit
                            className="edit-button"
                            onClick={() => handleEditUser(user)}
                          />
                          {isEditMode ? (
                            <AiFillDelete className="delete-button-disabled" />
                          ) : (
                            <AiFillDelete
                              className="delete-button"
                              onClick={() => handleDeleteUser(user)}
                            />
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
