import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

export default function AddUser({ editIndex, setEditIndex }) {
  const { users, setUsers } = useContext(UserContext);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (editIndex != null) {
      const requiredUser = users.find(user => user.id === editIndex);
      if (requiredUser) {
        setFullname(requiredUser.fullname);
        setEmail(requiredUser.email || '');
        setPhonenumber(requiredUser.phonenumber);
        setBalance(requiredUser.balance);
        setAddress(requiredUser.address);
        setPin(requiredUser.pin || '');
      }
    } else {
      clear();
    }
  }, [editIndex, users]);



  function alertPhoneError(warning) {
    setPhoneError(warning);
    setTimeout(() => setPhoneError(''), 5000);
  }

  function alertEmailError(warning) {
    setEmailError(warning);
    setTimeout(() => setEmailError(''), 5000);
  }

  function clear() {
    setEditIndex(null);
    setFullname('');
    setEmail('');
    setAddress('');
    setBalance('');
    setPhonenumber('');
    setPhoneError('');
    setEmailError('');
    setPin('');
  }

  const phoneRegex = /^(97|98)\d{8}$/;

  function normalizePhone(number) {
    return number.replace(/^\+977/, '');
  }


  function validatePhoneNumber(number) {
    return phoneRegex.test(normalizePhone(number));
  }
  

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedPhone = normalizePhone(phonenumber);

    if (!validatePhoneNumber(phonenumber)) {
      alertPhoneError('Wrong Phone Number');
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      setPinError("Pin must be exactly 4 digits");
      setTimeout(() => setPinError(""), 5000);      
      return;
    }

    const isDuplicatePhone = users.some(
      user => normalizePhone(user.phonenumber) === normalizedPhone
    );
    const isDuplicateEmail = email && users.some(user => user.email === email);

    if (isDuplicatePhone) {
      alertPhoneError('This phone number is already in use');
      return;
    }

    if (isDuplicateEmail) {
      alertEmailError('This email is already in use');
      return;
    }

    const temporaryArray = [...users];
    const temporaryUserObject = {
      id: Date.now(),
      fullname,
      email,
      phonenumber: normalizedPhone,
      balance,
      address,
      pin,
    };

    temporaryArray.push(temporaryUserObject);
    localStorage.setItem('userdetails', JSON.stringify(temporaryArray));
    setUsers(temporaryArray);
    clear();
  };

  function updateUser(e) {
    e.preventDefault();
    const normalizedPhone = normalizePhone(phonenumber);

    if (!validatePhoneNumber(phonenumber)) {
      alertPhoneError('Wrong Phone Number');
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
setPinError("Pin must be exactly 4 digits");
setTimeout(() => setPinError(""), 5000);
      return;
    }

    const isDuplicatePhone = users.some(
      user => normalizePhone(user.phonenumber) === normalizedPhone && user.id !== editIndex
    );
    const isDuplicateEmail = email && users.some(
      user => user.email === email && user.id !== editIndex
    );

    if (isDuplicatePhone) {
      alertPhoneError('This phone number is already in use');
      return;
    }

    if (isDuplicateEmail) {
      alertEmailError('This email is already in use');
      return;
    }

    const userIndex = users.findIndex(user => user.id === editIndex);
    if (userIndex === -1) return;

    const updatedUser = {
      ...users[userIndex],
      fullname,
      email,
      phonenumber: normalizedPhone,
      balance,
      address,
      pin,
    };

    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    localStorage.setItem('userdetails', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    clear();
  }

  return (

  <>
    <div className="modern-form-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card modern-card animate-fade-in">
              <div className="card-body p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <h1 className="header-title h2">
                    <i className={`fas ${editIndex == null ? 'fa-user-plus' : 'fa-user-edit'} me-2`}></i>
                    {editIndex == null ? 'Add New User' : 'Update User'}
                  </h1>
                  <p className="header-subtitle">
                    {editIndex == null
                      ? 'Fill in the details to create a new user account'
                      : 'Update the user information below'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={editIndex == null ? handleSubmit : updateUser}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-user me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      value={fullname}
                      onChange={e => setFullname(e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-envelope me-2"></i>Email Address
                      <small className="text-muted ms-1">(optional)</small>
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-modern"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                    {emailError && (
                      <div className="error-message">
                        <span className="error-icon"></span>
                        <p style={{color:'red'}}>{emailError}</p>                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-phone me-2"></i>Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      value={phonenumber}
                      onChange={e => setPhonenumber(e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                    {phoneError && (
                      <div className="error-message">
                        <span className="error-icon"></span>
                        <p style={{color:'red'}}>{phoneError}</p>                      </div>
                    )}
                  </div>

                  {/* Balance */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-wallet me-2"></i>Balance
                    </label>
                    <div className="input-group input-group-modern">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control form-control-modern"
                        value={balance}
                        onChange={e => setBalance(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-map-marker-alt me-2"></i>Address
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Enter address"
                      required
                    />
                  </div>

                  {/* Pin */}
                  <div className="mb-3">
                    <label className="form-label form-label-modern">
                      <i className="fas fa-key me-2"></i>4-Digit PIN
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-modern"
                      value={pin}
                      onChange={e => setPin(e.target.value)}
                      placeholder="Enter 4-digit pin"
                      required
                    />
                    {pinError && (
                      <div className="error-message">
                        <span className="error-icon"></span>
                        <p style={{color:'red'}}>{pinError}</p>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-modern-primary">
                      {editIndex == null ? 'Add User' : 'Update User'}
                    </button>
                    <button type="button" className="btn btn-modern-secondary" onClick={clear}>
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

}
