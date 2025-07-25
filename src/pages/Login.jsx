import React, { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase.js'; 
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/LoginContext.jsx';


export default function Login() {

  const { setUser } = useContext(AuthContext);

const navigate = useNavigate();
const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const userData = await res.json();
      console.log(userData);
      {/*checkpoint*/}
      const requiredUserData = {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        balance: 50,
        role: 0
      };

    
      const userRef = doc(db, "users", userData.email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("User already exists:", userSnap.data());
        localStorage.setItem("MTAToken", JSON.stringify(userSnap.data()));
        setUser(userSnap.data());
        navigate("/dashboard", {replace:true});

        
      } else {
        await setDoc(userRef, requiredUserData);
        console.log("New user added to Firestore:", requiredUserData);
        localStorage.setItem("MTAToken", JSON.stringify(requiredUserData));
        setUser(requiredUserData);
        navigate("/dashboard", {replace:true});
      }

    }  catch (err) {
      console.error('Failed to fetch user info or access Firestore:', err);
    }
  },
  onError: (error) => {
    console.error('Login Failed:', error);
  }
});


  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-900 text-pretty">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-md text-center space-y-8 border border-gray-700 backdrop-blur-sm">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">Easy Sewa</h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Secure digital wallet for seamless money transfers and payments across Nepal
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={login}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-600">
            Login with email
          </button>
        </div>

        <p className="text-gray-400 text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
