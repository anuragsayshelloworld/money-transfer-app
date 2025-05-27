import { useEffect, useState, useContext } from 'react';
import AddUser from './childcomponents/AddUser';
import DisplayUser from './childcomponents/DisplayUser';
import UserContext from './context/UserContext';
import LoginContext from '../context/LoginContext';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const { logger, setLogger } = useContext(LoginContext);

  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("userdetails")) || [];
    setUsers(usersLS);
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem("remembrance");
    sessionStorage.removeItem("remembrance");
    setLogger(null);
  }

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      
      <div className="container mt-3">
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="row gy-4 mt-3">
          <div className="col-12 col-md-5">
            <AddUser editIndex={editIndex} setEditIndex={setEditIndex} />
          </div>

          <div className="col-12 col-md-7">
            <DisplayUser editIndex={editIndex} setEditIndex={setEditIndex} />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
