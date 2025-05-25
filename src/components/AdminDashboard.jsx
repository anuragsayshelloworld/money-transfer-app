import { useEffect, useState } from 'react';
import AddUser from './childcomponents/AddUser';
import DisplayUser from './childcomponents/DisplayUser';
import UserContext from './context/UserContext';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const usersLS = JSON.parse(localStorage.getItem("userdetails")) || [];
    setUsers(usersLS);
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <div className="container mt-4">
        <div className="row gy-4">

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
