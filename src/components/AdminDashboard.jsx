import { useEffect, useState, useContext } from 'react';
import AddUser from './childcomponents/AddUser';
import DisplayUser from './childcomponents/DisplayUser';
import UserContext from './context/UserContext';
import LoginContext from '../context/LoginContext';
import Complaints from './Complaints';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const { logger, setLogger } = useContext(LoginContext);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("userdetails")) || [];
    setUsers(usersLS);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("remembrance");
    sessionStorage.removeItem("remembrance");
    setLogger(null);
  };

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {/* Full-width nav bar with tabs */}
      <nav className="bg-light border-bottom mb-4">
        <div className="container d-flex align-items-center justify-content-between py-2">
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            Easy-Sewa
          </div>

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                type="button"
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'complaint' ? 'active' : ''}`}
                onClick={() => setActiveTab('complaint')}
                type="button"
              >
                User Complaint
              </button>
            </li>
          </ul>

          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
            style={{ minWidth: '90px' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="container">
        {activeTab === 'dashboard' && (
          <div className="row gy-4">
            <div className="col-12 col-md-5">
              <AddUser editIndex={editIndex} setEditIndex={setEditIndex} />
            </div>

            <div className="col-12 col-md-7">
              <DisplayUser editIndex={editIndex} setEditIndex={setEditIndex} />
            </div>
          </div>
        )}

        {activeTab === 'complaint' && (
         <Complaints />
        )}
      </div>
    </UserContext.Provider>
  );
}
