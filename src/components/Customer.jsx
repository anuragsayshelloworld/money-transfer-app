import { useContext, useEffect, useState } from "react";
import LoginContext from "../context/LoginContext";

function CustomerDashboard() {
  const { logger, setLogger } = useContext(LoginContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("userdetails")) || [];

    // Find user by comparing phone numbers as numbers
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

  return (
    <>
      <p>Welcome, {logger}</p>
      <p>Your balance: {balance !== null ? balance : "Loading..."}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <SendMoney />
    </>
  );
}

function SendMoney() {
  const { logger } = useContext(LoginContext);

  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [numError, setNumError] = useState("");
  const [amtError, setAmtError] = useState("");
  const [sendMoneyMsg, setSendMoneyMsg] = useState("");
  const [step1, setStep1] = useState(true);
  const [name, setName] = useState('');


  // Called only onBlur or form submission
  const validateNumber = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails")) || [];
    const randonum = Number(number);

    if (userdetails.length === 0) {
      window.alert("There are no users of this app yet");
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
      setAmtError("Amount cannot be less than 50");
      return false;
    } else if (amt > 10000) {
      setAmtError("Amount cannot be more than 10,000");
      return false;
    } else if (sender.balance < amt) {
      setAmtError("Insufficient amount");
      return false;
    }

    setAmtError("");
    return true;
  };

  const sendMoney = (e) => {
    e.preventDefault();
    const isAmountValid = validateAmount();
    const isNumberValid = validateNumber();

    if (isAmountValid && isNumberValid) {
      setStep1(false);
      setAmtError("");
      setNumError("");
    } else {
      setSendMoneyMsg("Please try again.");
    }
  };
   useEffect(()=>{
    if(step1 === false){
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const tempName = userdetails.find((item)=>item.phonenumber === number)
    setName(tempName.fullname);
    }
   },[step1]);

   function sendConfirm(){
    let pinVal =  window.prompt("Enter your pin");
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const tempVal = userdetails.find((item)=>item.phonenumber === number)
    if(pinVal === tempVal.pin){
      window.alert("transferred");
      // bholi yaha transfer hune logic lekha 
      // set step 1 to true after the transction is made
      // save the statement in a different localStorage. all tommorow.
    }

   }
  return (
    
<>
    {step1 === true && (
      <><form onSubmit={sendMoney}>
        <p>{numError}</p>
        <input
          type="number"
          placeholder="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onBlur={validateNumber}
        />
        <p>{amtError}</p>
        <input
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={validateAmount}
        />
        <button type="submit">Send Money</button>
      </form>
      <p>{sendMoneyMsg}</p>
      
    </>
)}

{step1 === false && (
  <>
  <p>{name}</p>
  <p>{number}</p>
 
  <button onClick={sendConfirm}>Confirm</button>
  </>
)}

</>
  );
}

export default CustomerDashboard;
