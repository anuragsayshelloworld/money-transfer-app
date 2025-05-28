import { useState, useContext } from 'react';
import LoginContext from '../context/LoginContext';
import emailjs from 'emailjs-com';

export default function Login() {
  const { setLogger } = useContext(LoginContext);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [forgetPwd, setForgetPwd] = useState(false);
  const [recoveryEmail, setRecoveryemail] = useState('');
  const [sentemail, setSentEmail] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (password < 1000 || password > 9999) {
      setError("PIN must be 4 digits");
      return;
    }

    const userdetailsLS = JSON.parse(localStorage.getItem("userdetails")) || [];
    const filteredData = userdetailsLS.find(item =>
      item.phonenumber === username && item.pin === password
    );

    if (!filteredData) {
      setError("Wrong credentials");
    } else {
      setLogger(filteredData.phonenumber);
      if (rememberme) {
        localStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
      } else {
        sessionStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
      }
    }
  };

  const handleRecovery = (e) => {
    e.preventDefault();

    const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    const userIndex = userdetails.findIndex(item => item.email === recoveryEmail);

    if (userIndex === -1) {
      setError("Email not found");
      return;
    }

    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    userdetails[userIndex].pin = newPin;
    localStorage.setItem("userdetails", JSON.stringify(userdetails));

    const emailParams = {
  email: recoveryEmail,  // <-- this must match the template variable exactly
  new_pin: newPin
};

    emailjs.send('service_6vjrpop', 'template_f4673uo', emailParams, 'cm1wHY7sIZ75KbKOv')
      .then((result) => {
        setSentEmail("Please check you email for your new pin");
        setTimeout(()=>{
          setSentEmail("");
        }, 10000);

        setError('');
        setForgetPwd(false);
        setRecoveryemail('');
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
        setError("Failed to send email. Try again later.");
      });
  };

  return (
    <>
      {!forgetPwd && (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Easy-Sewa Login</h3>

            {error && <div className="alert alert-danger text-center">{error}</div>}
             <p style={{color:'green'}}>{sentemail}</p>
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

            <a href="#" className="text-primary text-decoration-underline mt-2 d-block text-center" onClick={(e) => {
              e.preventDefault();
              setForgetPwd(true);
              setError('');
            }}>
              Forgot password?
            </a>
          </div>
        </div>
      )}

      {forgetPwd && (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <h4 className="mb-3">Recover PIN</h4>
            <p style={{ color: 'blue' }}><i>New PIN will be sent to your email</i></p>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleRecovery}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="user_email"
                  placeholder="Enter your email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryemail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Send PIN</button>
            </form>

            <a href="#" className="text-secondary text-decoration-underline mt-3 d-block text-center" onClick={(e) => {
              e.preventDefault();
              setForgetPwd(false);
              setRecoveryemail('');
              setError('');
            }}>
              Back to Login
            </a>
          </div>
        </div>
      )}
    </>
  );
}
