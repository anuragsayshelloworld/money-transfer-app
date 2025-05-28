import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";

function CustomerDashboard() {
  const { logger, setLogger } = useContext(LoginContext);
  const [balance, setBalance] = useState(null);
  const [currentpin, setCurrentpin] = useState('');
  const [newpin, setNewpin] = useState('');
  const [pinchangeerror, setPinchangeError] = useState('');
  const [newpinerror, setNewpinError] = useState('');
  const [success, setSuccess] = useState(''); 
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("userdetails")) || [];
    const user = users.find(user => Number(user.phonenumber) === Number(logger));
    if (user) {
      setBalance(user.balance);
    } else {
      setBalance(null);
    }
  }, [logger]);

  const handleLogout = () => {
    setLogger(null);
    localStorage.removeItem("remembrance");
    sessionStorage.removeItem("remembrance");
  };

const changePwd = (e) => {
  e.preventDefault();

  const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];

  const index = userdetails.findIndex(item => item.phonenumber === logger);

  if (index === -1) {
    setPinchangeError("User not found.");
    setTimeout(() => {
    setPinchangeError('');
  }, 5000);
    return;
  }

  const requiredUser = userdetails[index];

  if (requiredUser.pin !== currentpin) {
    setPinchangeError("Wrong current pin.");
    setTimeout(() => {
    setPinchangeError('');
  }, 5000);
    return;
  }

  if (newpin < 1000 || newpin > 9999) {
    setNewpinError("Pin must be a 4-digit number.");
    setTimeout(() => {
    setNewpinError('');
  }, 5000);
    return;
  }

  // Update pin
  userdetails[index].pin = newpin;
  localStorage.setItem("userdetails", JSON.stringify(userdetails));

  setSuccess("Pin changed successfully!");
  setCurrentpin('');
  setNewpin('');
  setPinchangeError('');
  setNewpinError('');

  setTimeout(() => {
    setSuccess('');
  }, 5000);
};


  return (
    <div className="min-vh-100 bg-light">
      {/* Simple Header */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom border-light shadow-sm">
        <div className="container">
          <span className="navbar-brand mb-0 h1 text-dark fw-bold">
            Easy-Sewa
          </span>
          <button 
            className="btn btn-outline-dark" 
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row g-4">
          {/* Balance Card - Simplified */}
          <div className="col-lg-4">
            <div className="card bg-white border h-100 shadow-sm">
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="text-dark mb-3">Welcome back!</h5>
                  <p className="text-muted mb-4">{logger}</p>
                  
                  <div className="bg-light rounded p-3 mb-4">
                    <small className="text-muted d-block mb-1">Available Balance</small>
                    <h2 className="text-success mb-0 fw-bold">
                      ₹{balance !== null ? balance.toLocaleString() : "Loading..."}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Send Money Card */}
          <div className="col-lg-4">
            <SendMoney />
          </div>

          {/* Empty Div for your use - Named: customContentDiv */}
          <div className="col-lg-4" id="customContentDiv">
            <div className="card bg-white border h-100 shadow-sm">
              <div className="card-body p-4 d-flex align-items-center justify-content-center">
                <div className="text-center text-muted">
                   <div>
  {success && <div className="alert alert-success">{success}</div>}

  <form onSubmit={changePwd}>
    {pinchangeerror && <div className="alert alert-danger">{pinchangeerror}</div>}

    <div className="mb-3">
      <input
        type="number"
        className="form-control"
        placeholder="Current pin"
        value={currentpin || ''}
        onChange={(e) => setCurrentpin(e.target.value)}
        min="0"
      />
    </div>

    {newpinerror && <div className="alert alert-danger">{newpinerror}</div>}

    <div className="mb-3">
      <input
        type="number"
        className="form-control"
        placeholder="New pin"
        value={newpin || ''}
        onChange={(e) => setNewpin(e.target.value)}
        min="0"
      />
    </div>

    <button type="submit" className="btn btn-muted w-100">
      Change
    </button>
  </form>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="row mt-4">
          <div className="col-12">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

function SendMoney() {
  const { logger } = useContext(LoginContext);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [numError, setNumError] = useState("");
  const [amtError, setAmtError] = useState("");
  const [step1, setStep1] = useState(true);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');

  const showAlert = (title, message, type = 'info') => {
    setModalContent({ title, message, type });
    setShowModal(true);
  };

  const cancelConfirm = () => {
    setAmount('');
    setAmtError('');
    setNumber('');
    setNumError('');
    setStep1(true);    
  };

  const validateNumber = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    const randonum = Number(number);

    if(randonum === Number(logger)){
      setNumError("You can't send money to yourself");
      return false;
    }

    if (userdetails.length === 0) {
      showAlert("No Users", "There are no users of this app yet", "warning");
      return false;
    }

    const requiredUser = userdetails.find((item) => Number(item.phonenumber) === randonum);
    if (!requiredUser) {
      setNumError("User doesn't exist");
      return false;
    }

    setNumError("");
    return true;
  };

  const validateAmount = () => {
    const amt = Number(amount);
    const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    const sender = userdetails.find((item) => Number(item.phonenumber) === Number(logger));

    if (!sender) {
      setAmtError("Logged-in user not found");
      return false;
    }

    if (amt < 50) {
      setAmtError("Amount cannot be less than ₹50");
      return false;
    } else if (amt > 10000) {
      setAmtError("Amount cannot be more than ₹10,000");
      return false;
    } else if (sender.balance < amt) {
      setAmtError("Insufficient balance");
      return false;
    }

    setAmtError("");
    return true;
  };

  const sendMoney = () => {
    const isAmountValid = validateAmount();
    const isNumberValid = validateNumber();

    if (isAmountValid && isNumberValid) {
      setStep1(false);
      setAmtError("");
      setNumError("");
    }
  };

  useEffect(() => {
    if(step1 === false){
      const userdetails = JSON.parse(localStorage.getItem("userdetails"));
      const tempName = userdetails.find((item) => item.phonenumber === number);
      setName(tempName.fullname);
    }
  }, [step1]);

  const handlePinSubmit = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    const tempVal = userdetails.find(item => item.phonenumber === logger);

    if (!tempVal) {
      showAlert("Error", "Sender not found", "error");
      return;
    }

    if (pin === tempVal.pin) {
      showAlert("Success", "Money transferred successfully!", "success");

      let transferStatementRecord = {
  id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
  senderNum: logger,
  receiverNum: number,
  amount: Number(amount),
  date: Date.now(),
  type: 'sent',  // or 'received' as per logic
  otherUserNum: number,
  otherUserName: '',  // or actual user name if you have it
};

      let transferRecordsRaw = localStorage.getItem("transferStatementRecord");
      let transferRecords;
      try {
        transferRecords = JSON.parse(transferRecordsRaw);
        if (!Array.isArray(transferRecords)) {
          transferRecords = [];
        }
      } catch {
        transferRecords = [];
      }

      transferRecords.push(transferStatementRecord);
      localStorage.setItem("transferStatementRecord", JSON.stringify(transferRecords));

      const updatedUserDetails = userdetails.map(user => {
        if (user.phonenumber === logger) {
          return { ...user, balance: user.balance - Number(amount) };
        } else if (user.phonenumber === number) {
          return { ...user, balance: user.balance + Number(amount) };
        } else {
          return user;
        }
      });

      localStorage.setItem("userdetails", JSON.stringify(updatedUserDetails));
      
      setNumber('');
      setAmount('');
      setStep1(true);
      setShowPinModal(false);
      setPin('');
      window.location.reload();
    } else {
      showAlert("Invalid PIN", "Wrong PIN entered. Please try again.", "error");
    }
  };

  return (
    <>
      <div className="card bg-white border h-100 shadow-sm">
        <div className="card-body p-4">
          <div className="mb-4">
            <h5 className="mb-0 fw-bold text-dark">Send Money</h5>
            <small className="text-muted">Transfer funds instantly</small>
          </div>

          {step1 ? (
            <div>
              <div className="mb-3">
                <label className="form-label text-dark">Phone Number</label>
                <input
                  type="number"
                  className={`form-control bg-light border text-dark ${numError ? 'is-invalid' : ''}`}
                  placeholder="Enter phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onBlur={validateNumber}
                />
                {numError && <div className="invalid-feedback">{numError}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label text-dark">Amount</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border text-dark">₹</span>
                  <input
                    type="number"
                    className={`form-control bg-light border text-dark ${amtError ? 'is-invalid' : ''}`}
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onBlur={validateAmount}
                  />
                  {amtError && <div className="invalid-feedback">{amtError}</div>}
                </div>
              </div>
              
              <button 
                type="button" 
                className="btn btn-primary w-100"
                onClick={sendMoney}
              >
                Continue Transfer
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-light rounded p-3 mb-3">
                <h6 className="fw-bold mb-3 text-dark">Confirm Transfer</h6>
                <div className="text-start">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">To:</span>
                    <span className="text-dark">{name}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Phone:</span>
                    <span className="text-dark">{number}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Amount:</span>
                    <span className="text-success fw-bold">₹{Number(amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-success"
                  onClick={() => setShowPinModal(true)}
                >
                  Confirm Transfer
                </button>
                <button className="btn btn-outline-secondary" onClick={cancelConfirm}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simple Alert Modal */}
      {showModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-white border">
              <div className={`modal-header border-bottom ${modalContent.type === 'success' ? 'bg-success' : modalContent.type === 'error' ? 'bg-danger' : 'bg-info'}`}>
                <h5 className="modal-title text-white">{modalContent.title}</h5>
              </div>
              <div className="modal-body text-dark">
                <p className="mb-0">{modalContent.message}</p>
              </div>
              <div className="modal-footer border-top">
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple PIN Modal */}
      {showPinModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-white border">
              <div className="modal-header border-bottom bg-warning">
                <h5 className="modal-title text-dark">Enter PIN</h5>
              </div>
              <div className="modal-body text-center">
                <p className="text-muted mb-3">Enter your 4-digit PIN</p>
                <input
                  type="password"
                  className="form-control bg-light border text-dark text-center"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  maxLength="4"
                />
              </div>
              <div className="modal-footer border-top d-grid gap-2">
                <button className="btn btn-success" onClick={handlePinSubmit}>
                  Verify & Transfer
                </button>
                <button className="btn btn-outline-secondary" onClick={() => {setShowPinModal(false); setPin('');}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TransactionHistory() {
  const { logger } = useContext(LoginContext);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [jargain, setJargain] = useState('');
  const [success, setSuccess] = useState('');

  const loadTransactions = () => {
    const transferRecords = JSON.parse(localStorage.getItem("transferStatementRecord")) || [];
    const userDetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    
    let userTransactions = transferRecords
      .filter(record => record.senderNum === logger || record.receiverNum === logger)
      .map(record => {
        const isReceived = record.receiverNum === logger;
        const otherUserNum = isReceived ? record.senderNum : record.receiverNum;
        const otherUser = userDetails.find(user => user.phonenumber === otherUserNum);
        
        return {
          ...record,
          type: isReceived ? 'received' : 'sent',
          otherUserName: otherUser ? otherUser.fullname : 'Unknown User',
          otherUserNum,
          amount: record.amount || 0,
          id: record.id || `${record.date}-${Math.random()}`
        };
      });

    // Filter by type
    if (filterType !== 'all') {
      userTransactions = userTransactions.filter(t => t.type === filterType);
    }

    // Sort transactions
    userTransactions.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'amount') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setTransactions(userTransactions);
  };

  useEffect(() => {
    loadTransactions();
  }, [logger, sortBy, sortOrder, filterType]);

  const deleteTransaction = (transactionId) => {
  const transferRecords = JSON.parse(localStorage.getItem("transferStatementRecord")) || [];

  const updatedRecords = transferRecords.filter(record => record.id !== transactionId);

  localStorage.setItem("transferStatementRecord", JSON.stringify(updatedRecords));
  loadTransactions();
};


  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
    const helpdeskfx = (e) =>{
      e.preventDefault();
      let userDetails = JSON.parse(localStorage.getItem("userdetails")) || [];
      let requiredUser = userDetails.find((user)=>{
        return user.phonenumber === logger;
      });
      let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
      let newComplaint = {
        id: requiredUser.id,
        name: requiredUser.fullname,
        text: jargain,
        phonenumber: requiredUser.phonenumber,
        date: new Date().toISOString(),
      }
      complaints.push(newComplaint);
      localStorage.setItem("complaints",JSON.stringify(complaints));
      setJargain('');
      setSuccess("Messege sent!");
      
      setTimeout(()=>{
        setSuccess('')
      },5000);

    }

return (
  <div className="row">
    {/* Transaction History Card */}
    <div className="col-md-6">
      <div className="card bg-white border shadow-sm">
        <div className="card-header bg-white border-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h5 className="mb-0 fw-bold text-dark">Transaction History</h5>
              <small className="text-muted">{transactions.length} transactions</small>
            </div>
            <div className="col-md-6">
              <div className="row g-2">
                <div className="col-md-4">
                  <select 
                    className="form-select form-select-sm bg-light border text-dark"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="sent">Sent Only</option>
                    <option value="received">Received Only</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select 
                    className="form-select form-select-sm bg-light border text-dark"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="otherUserName">Sort by Name</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <button 
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {transactions.length === 0 ? (
            <div className="text-center p-5">
              <h6 className="text-muted">No transactions yet</h6>
              <p className="text-muted small">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className={`d-flex align-items-center p-3 mb-2 rounded border ${transaction.type === 'received' ? 'border-success bg-light' : 'border-danger bg-light'}`}
                >
                  <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${transaction.type === 'received' ? 'bg-success' : 'bg-danger'}`} style={{width: '40px', height: '40px'}}>
                    <span className="text-white">{transaction.type === 'received' ? '↓' : '↑'}</span>
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1 text-dark">
                          {transaction.type === 'received' ? 'From' : 'To'} {transaction.otherUserName}
                        </h6>
                        <div className="text-muted small">
                          <span className="me-3">{transaction.otherUserNum}</span>
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <h6 className={`mb-0 ${transaction.type === 'received' ? 'text-success' : 'text-danger'}`}>
                          {transaction.type === 'received' ? '+' : '-'}₹{(transaction.amount || 0).toLocaleString()}
                        </h6>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteTransaction(transaction.id)}
                          style={{ width: '30px', height: '30px' }}
                          title="Delete this transaction"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Adjacent Empty Div Named 'sth' */}
    <div className="col-md-6">
  <div className="card bg-white border shadow-sm p-4">
    <h5 className="mb-2 fw-bold text-dark"> Contact desk</h5>
    <p style={{color:'green'}}>{success}</p>
    <form onSubmit={helpdeskfx}>
      <div className="mb-2">
        <textarea
          value={jargain}
          onChange={(e)=>setJargain(e.target.value)}
          className="form-control"
          rows="3"
          placeholder="Please send us your problem. Our response will be swift."
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  </div>
</div>
    
  </div>
);

}

export default CustomerDashboard;