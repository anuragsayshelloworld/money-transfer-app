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
      role: 1
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
    <div className="container mt-5">
      <form
        onSubmit={editIndex == null ? handleSubmit : updateUser}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email <small><i style={{ color: 'gray' }}> (optional)</i></small>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <i>
            <small style={{ color: 'red' }}>{emailError}</small>
          </i>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phonenumber}
            onChange={e => setPhonenumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <i>
            <small style={{ color: 'red' }}>{phoneError}</small>
          </i>
        </div>

        <div className="mb-3">
          <label className="form-label">Balance</label>
          <input
            type="number"
            className="form-control"
            value={balance}
            onChange={e => setBalance(e.target.value)}
            placeholder="Enter balance"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">4-digit Pin</label>
          <input
            type="number"
            className="form-control"
            value={pin}
            onChange={e => {
              const value = e.target.value;
              if (value.length <= 4) setPin(value);
            }}
            placeholder="Enter 4-digit pin"
            required
          />
          <i>
            <small style={{ color: 'red' }}>{pinError}</small>
          </i>
        </div>

        <button type="submit" className="btn btn-primary w-100 shadow">
          {editIndex == null ? 'Save' : 'Update Info'}
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={clear}
          className="btn w-100 shadow"
        >
          Clear
        </button>
      </form>
    </div>
  );
}
