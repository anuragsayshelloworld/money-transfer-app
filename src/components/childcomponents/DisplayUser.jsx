import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

export default function DisplayUser({ setEditIndex }) {
  const { users, setUsers } = useContext(UserContext);
  const [searchtext, setSearchtext] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);

  const deleteUser = (id) => {
    const newCopyOfUsers = users.filter((item) => item.id !== id);
    localStorage.setItem("userdetails", JSON.stringify(newCopyOfUsers));
    setUsers(newCopyOfUsers);
    setEditIndex(null);
  };

  const editUser = (id) => {
    setEditIndex(id);
  };

  const search = (event) => {
    const value = event.target.value;
    setSearchtext(value);

    if (value.trim() === '') {
      setFilteredUsers(null);
      return;
    }

    const requiredUsers = users.filter((user) => {
      return (
        user.fullname.toLowerCase().includes(value.toLowerCase()) ||
        user.phonenumber.includes(value)
      );
    });

    setFilteredUsers(requiredUsers);
  };

  const displayList = (filteredUsers || users).slice().reverse();

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <input 
          type="text" 
          placeholder="Search by name or number" 
          className="form-control"
          value={searchtext}
          onChange={search}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
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
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
                    {' / '}
                    <button onClick={() => editUser(u.id)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
