import { useState, useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function Login(){

	const {logger, setLogger} = useContext(LoginContext);
	const [error, setError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
    	event.preventDefault();
        const userdetailsLS = JSON.parse(localStorage.getItem("userdetails")) || [];
        const filteredData = userdetailsLS.find((item)=>{
        	return item.phonenumber === username && item.pin === password; 
        }) || false;
        if (!filteredData){
        	setError("Wrong Credentials");
        }
        else{
        	setLogger(filteredData.phonenumber);
        }
    }
 

	return(
		<>

		<p style={{color:'red'}}>{error}</p>
		<form onSubmit={handleLogin}>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
			<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />			
		    <button type="submit">Login</button>
		</form>	

		</>
		);
}