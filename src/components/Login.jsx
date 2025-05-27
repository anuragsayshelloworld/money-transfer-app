import { useState, useContext } from 'react';
import LoginContext from '../context/LoginContext';

export default function Login(){

	const {setLogger} = useContext(LoginContext);
	const [error, setError] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [rememberme, setRememberme] = useState(false);

    const handleLogin = (event) => {
    	event.preventDefault();
		if(password<1000 || password>9999){
			setError("Pin Must be 4 digit");
		}
		else{																					
        const userdetailsLS = JSON.parse(localStorage.getItem("userdetails")) || [];
        const filteredData = userdetailsLS.find((item)=>{
        	return item.phonenumber === username && item.pin === password; 
        }) || false;
        if (!filteredData){
        	setError("Wrong Credentials");
        }
        else{
        	setLogger(filteredData.phonenumber);
			if(rememberme){
				localStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
			}
			else{
				sessionStorage.setItem("remembrance", JSON.stringify(filteredData.phonenumber));
			}
        }}
    }
 

	return(
		<>

		<p style={{color:'red'}}>{error}</p>
		<form onSubmit={handleLogin}>
			<input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
			<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
			<input type='checkbox' checked={rememberme} onChange={(e)=>{setRememberme(e.target.checked)}} />			
		    <label>Remember me</label>
			<button type="submit">Login</button>
		</form>	

		</>
		);
}