import React, { useEffect, useState } from 'react';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { loginStart, loginFailure, loginSuccess } from '../redux/useSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import axios from 'axios';
import { API_URLS } from '../config/api';

export const SignIn = () => {

  const { loading, error ,currentUser} = useSelector((state) => state.user);
  const [account, setAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMessage,setSuccessMessage] = useState(false);

  useEffect(()=>{
    if(currentUser){
      navigate('/');
    }
  },[currentUser,navigate]);


  const handleLogin = async (e) => {

    e.preventDefault();
    dispatch(loginStart());

    try {
      const res =await axios.post(`${API_URLS.AUTH}/signin`,
        {
          email,
          password
        },
        { withCredentials: true }
      )
      dispatch(loginSuccess(res.data))

      navigate('/',{replace:true})
    } catch (err) {
      console.error("login error", err)
      dispatch(loginFailure())
    }
  }


  const handleSignUp = async (e) => {

    e.preventDefault();

    try {
      await axios.post(`${API_URLS.AUTH}/signup`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      )
      setSuccessMessage(true);
      setAccount(true);
    } catch (err) {
      console.error("Signup error", err)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-white bg-gray-900 px-4">
      <div className="flex flex-col items-center bg-gray-900 md:bg-gray-950 md:border border-gray-800 py-10 px-8 sm:px-12 rounded-xl sm:shadow-2xl w-full max-w-md">

        {account ? (
         <form onSubmit={handleLogin} className="w-full flex flex-col">
            <h1 className="text-2xl font-bold mb-2 tracking-wide">Sign in</h1>
            <h2 className="text-gray-400 mb-8 text-sm font-medium">to continue to YouTube</h2>
            
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white font-medium py-2.5 rounded-md mt-2 hover:bg-blue-700 transition-colors disabled:bg-blue-800"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              {error && <span className="text-red-500 text-sm">Wrong email or password!</span>}
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="w-full flex flex-col">
            <h1 className="text-2xl font-bold mb-2 tracking-wide">Sign up</h1>
            <h2 className="text-gray-400 mb-8 text-sm font-medium">Create an Account</h2>
            
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent border border-gray-700 rounded-md px-4 py-2.5 text-white outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="bg-gray-800 text-gray-300 font-medium py-2.5 rounded-md mt-2 hover:bg-gray-700 transition-colors border border-gray-700">
                Create account
              </button>
            </div>
          </form>
        )}

        <h1 className="text-gray-500 my-5 text-xs font-bold uppercase tracking-widest">OR</h1>
        <GoogleSignInButton />
        {successMessage && <p className="text-blue-400 text-sm mt-4">Account created! Please login.</p>}

        <div className="mt-8 flex items-center justify-between w-full text-sm">
          <span className="text-gray-400">{account ? "Don't have an account?" : "Already have an account?"}</span>
          <button
            className="text-blue-500 font-semibold hover:text-blue-400 transition-colors"
            onClick={() => setAccount(!account)}
          >
            {account ? "Create account" : "Sign in"}
          </button>
        </div>

      </div>

      <div className="flex gap-6 mt-6 text-xs text-gray-500 font-medium">
        <span className="cursor-pointer hover:text-gray-400">English (United States)</span>
        <span className="cursor-pointer hover:text-gray-400">Help</span>
        <span className="cursor-pointer hover:text-gray-400">Privacy</span>
        <span className="cursor-pointer hover:text-gray-400">Terms</span>
      </div>

    </div>
  );
};