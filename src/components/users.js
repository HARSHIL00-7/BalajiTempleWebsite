import React, { useState } from 'react';
import './users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addUser = (event) => {
    event.preventDefault();
  
    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const phone = form.elements.phone.value;
    const address = form.elements.address.value;
  
    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
  
    setUsers([...users, newUser]);
    setShowForm(false);
  
    // Reset form input values
    form.reset();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const goBack = () => {
    setShowForm(false);
  };

  return (
    <div className="user-form2">
      <h1 className="heading">Users</h1>
      {showForm ? (
  
        <form className='form-container1' onSubmit={addUser}>

          <div className="columns-container1">
        
        <div className="column1">
          <div className="row">
          <label htmlFor="username">
          Username<span className="requiredfield">*</span>
        </label>
        </div>
        <div className="row">
        <input
            type="text"
            id="username"
            required  placeholder='Username'/>
      </div>
          <div className="row">
            <label htmlFor="district">Name of the district<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <select id="district" required>
          <option value="">0 options selected</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
        </select>
          </div>
          <div className="row">
            <label htmlFor="village">Name of the Village<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="village"
            required />
          </div>
        </div>
        <div className="column1">
          <div className="row">
            <label htmlFor="assembly">Name of the Assembly Constituency<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="assembly" required/>
          </div>
          <div className="row">
            <label htmlFor="Colony">Name of the Hamlet,Colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Colony" required/>
          </div>
          <div className="row">
            <label htmlFor="Population">Population of the Village/ Hamlet/ Colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Population" required/>
          </div>
        </div>
        </div>
        <div class="form-buttons-container1">
        <button class="form-submit-button1">Add User</button>
            <button class="back-button" onClick={goBack}>Back</button>
            
            </div>
            </form>
         
      ) : (
        <div className="user-form2">
        <div className="columns-container">
          {/* Table content */}
          <table>
            <thead>
              <tr>
                <th colSpan="4">User Details</th>
                <th>
                  <button onClick={toggleForm}>Add a User</button>
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
}

export default Users;
