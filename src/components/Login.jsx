import { useState, useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function Login() {
  const { setLogger } = useContext(LoginContext);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (password < 1000 || password > 9999) {
      setError("Pin Must be 4 digit");
    } else {
      const userdetailsLS = JSON.parse(localStorage.getItem("userdetails")) || [];
      const filteredData = userdetailsLS.find((item) => {
        return item.phonenumber === username && item.pin === password;
      }) || false;

      if (!filteredData) {
        setError("Wrong Credentials");
      } else {
        setLogger(filteredData.phonenumber);
        if (rememberme) {
          localStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
        } else {
          sessionStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
        }
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Easy-Sewa Login</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">4-digit PIN</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PIN"
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberme"
              checked={rememberme}
              onChange={(e) => setRememberme(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberme">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
