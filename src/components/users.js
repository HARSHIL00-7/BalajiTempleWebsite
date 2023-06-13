import React, { useState,useEffect } from 'react';
import './users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);


  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  const addUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;
    const role = form.elements.role.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      username: username,
      password: password,
      email: email,
      phone: phone,
      role: role,
      action: '',
    };

    setUsers([...users, newUser]);
    setShowForm(false);
    setPasswordMatch(true);

    // Reset form input values
    form.reset();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const goBack = () => {
    setShowForm(false);
    setPasswordMatch(true);
  };

  const handleEditUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedUsername = form.elements.username.value;
    const updatedEmail = form.elements.email.value;
    const updatedPhone = form.elements.phone.value;
    const updatedRole = form.elements.role.value;

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user === editUser) {
          return {
            ...user,
            username: updatedUsername,
            email: updatedEmail,
            phone: updatedPhone,
            role: updatedRole,
          };
        }
        return user;
      })
    );

    setEditUser(null);
    form.reset();
  };
  const clearEntries = () => {
    setUsers([]);
  };

  const handleConfirmPasswordChange = (event) => {
    const form = event.target.form;
    const password = form.elements.password.value;
    const confirmPassword = event.target.value;

    setPasswordMatch(password === confirmPassword);
  };

  return (
    <div className="user-form2">
    
      {showForm ? (
        <div className="user-form2">
        <h1 className="heading">New User</h1>
        <form className="form-container1" onSubmit={addUser}>

          <div className="columns-container1">
         
            <div className="column1">
              <div className="row">
                <label htmlFor="username">
                  Username<span className="requiredfield">*</span>
                </label>
              </div>
              <div className="row">
                <input type="text" id="username" required name="username" placeholder="Username" />
              </div>
              <div className="row">
                <label htmlFor="pass">
                  Password<span className="required-field">*</span>
                </label>
              </div>
              <div className="row">
                <input type="password" id="pass" required name="password" placeholder="Password" />
              </div>
              <div className="row">
                <label htmlFor="phn">Phone No.<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="number" id="phn" required name="phone" placeholder="Phone no" />
              </div>
              
            </div>
            <div className="column1">
              <div className="row">
                <label htmlFor="mail">Email<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="email" id="mail" name="email" required placeholder="Email" />
              </div>
             
              <div className="row">
                <label htmlFor="confirmPass">
                  Confirm Password<span className="required-field">*</span>
                </label>
              </div>
              <div className="row">
                <input
                  type="password"
                  id="confirmPass"
                  required
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {!passwordMatch &&(
                <div className="row">
                  <span className="error">Passwords do not match</span>
                </div>
              )}
              <div className="row">
                <label htmlFor="role">Role<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="text" id="role" name="role" required placeholder="Super Admin" />
              </div>
            </div>
          </div>
          <div className="form-buttons-container1">
            <button className="form-submit-button1">Add User</button>
            <button className="back-button" onClick={goBack}>Back</button>
          </div>
        </form>
        </div>
      ) : (
        <div className="user-form2">
        <h1 className="heading">User</h1>
          <div className="columns-container">
            <table>
            <thead>
  <tr>
    <th colSpan="5">
      <div className="table-header">
        <span>User Details</span>
        <div className="header-buttons">
          <button onClick={toggleForm}>Add a User</button>
          <button onClick={clearEntries}>Clear All Entries</button>
        </div>
      </div>
    </th>
  </tr>
  <tr>
    <th>Username</th>
    <th>Email</th>
    <th>Phone No.</th>
    <th>Role</th>
    <th>Action</th>
  </tr>
</thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => setEditUser(user)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {editUser && (
        <form className="form-container1" onSubmit={handleEditUser}>
          <div className="columns-container1">
            <div className="column1">
              <div className="row">
                <label htmlFor="username">
                  Username<span className="requiredfield">*</span>
                </label>
              </div>
              <div className="row">
                <input type="text" id="username" required name="username" placeholder="Username" defaultValue={editUser.username}/>
              </div>
              <div className="row">
                <label htmlFor="pass">
                  Password<span className="required-field">*</span>
                </label>
              </div>
              <div className="row">
                <input type="password" id="pass" required name="password" placeholder="Password" />
              </div>
              <div className="row">
                <label htmlFor="phn">Phone No.<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="number" id="phn" required name="phone" placeholder="Phone no"  defaultValue={editUser.phone}/>
              </div>
            </div>
            <div className="column1">
              <div className="row">
                <label htmlFor="mail">Email<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="email" id="mail" name="email" required placeholder="Email"  defaultValue={editUser.email}/>
              </div>
              <div className="row">
                <label htmlFor="passw">
                  Confirm Password<span className="required-field">*</span>
                </label>
              </div>
              <div className="row">
                <input type="password" id="passw" required placeholder="Confirm Password" />
              </div>
              <div className="row">
                <label htmlFor="role">Role<span className="required-field">*</span></label>
              </div>
              <div className="row">
                <input type="text" id="role" name="role" required placeholder="Super Admin" defaultValue={editUser.role} />
              </div>
            </div>
          </div>
          <div className="form-buttons-container1">
          <button type="submit">Save</button>
            <button className="back-button" onClick={goBack}>Back</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Users;






