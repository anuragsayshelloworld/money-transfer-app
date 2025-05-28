import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DisplayUser({ setEditIndex }) {
  const { users, setUsers } = useContext(UserContext);
  const [searchtext, setSearchtext] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const confirmDelete = () => {
    if (confirmationInput === userToDelete.phonenumber) {
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      localStorage.setItem("userdetails", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setEditIndex(null);
      setShowModal(false);
      setErrorMessage('');
    } else {
      setErrorMessage('Phone number does not match.');
    }
  };

  const deleteUserPrompt = (user) => {
    setUserToDelete(user);
    setConfirmationInput('');
    setShowModal(true);
    setErrorMessage('');
  };

  const editUser = (id) => {
    setEditIndex(id);
  };

  const search = (event) => {
    const value = event.target.value;
    setSearchtext(value);
    if (value.trim() === '') return setFilteredUsers(null);

    const results = users.filter((user) =>
      user.fullname.toLowerCase().includes(value.toLowerCase()) ||
      user.phonenumber.includes(value)
    );
    setFilteredUsers(results);
  };

  const displayList = (filteredUsers || users).slice().reverse();

  return (
    <div className="container mt-4">
      <div className="card shadow-sm rounded-4 p-4">
        <h4 className="mb-2">User List</h4>
        <p className="text-muted">Total Users: {users.length}</p>

        <input 
          type="text" 
          placeholder="Search by name or number" 
          className="form-control mb-3 shadow-sm rounded-3"
          value={searchtext}
          onChange={search}
        />

        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Number</th>
                <th>Balance</th>
                <th>Pin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No users found</td>
                </tr>
              ) : (
                displayList.map((u) => (
                  <tr key={u.id}>
                    <td>{u.fullname}</td>
                    <td>{u.phonenumber}</td>
                    <td>{u.balance}</td>
                    <td>{u.pin}</td>
                    <td>
                      <span
                        role="button"
                        onClick={() => editUser(u.id)}
                        title="Edit"
                        className="me-3 text-secondary"
                        style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                      >
                        ✏️
                      </span>
                      <span
                        role="button"
                        onClick={() => deleteUserPrompt(u)}
                        title="Delete"
                        className="text-danger"
                        style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && userToDelete && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-2">
                  To confirm deletion of <strong>{userToDelete.fullname}</strong>,<br />
                  type their phone number: <code>{userToDelete.phonenumber}</code>
                </p>
                <input
                  type="text"
                  className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                  value={confirmationInput}
                  onChange={(e) => {
                    setConfirmationInput(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Type phone number here"
                />
                {errorMessage && (
                  <div className="invalid-feedback mt-2">
                    {errorMessage}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
