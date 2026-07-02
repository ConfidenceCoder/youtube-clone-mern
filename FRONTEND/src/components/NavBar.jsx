import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URLS } from '../config/api';
import { logout } from '../redux/useSlice';

export const NavBar = ({ toggleMenu, setIsUploadOpen }) => {
  const [openModel, setOpenModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogOut = async () => {
    try {
      await axios.post(`${API_URLS.AUTH}/logout`, {}, { withCredentials: true });
      dispatch(logout());
      setOpenModel(false);
      navigate('/signin');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-gray-900 h-14 md:h-16 flex items-center justify-between px-2 md:px-4 z-50 sticky top-0 gap-2">
      
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <Link to="/" className="text-white text-lg md:text-xl font-semibold tracking-tighter flex items-center gap-1 text-decoration-none order-1 md:order-2">
          <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-red-600" fill="currentColor">
            <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z" />
          </svg>
          <span className="hidden sm:block">YouTube</span>
        </Link>
        <button onClick={toggleMenu} className="text-white text-xl hover:bg-gray-800 p-1 md:p-2 rounded-full outline-none order-2 md:order-1">
          ☰
        </button>
      </div>

      <div className="flex-grow max-w-[550px] flex justify-center mx-2">
        <div className="flex items-center w-full bg-gray-900 rounded-full border border-gray-700 overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-white px-3 py-1 md:px-5 md:py-2 text-sm"
          />
          <button className="bg-gray-800 px-3 md:px-5 py-1 md:py-2 border-l border-gray-700 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end flex-shrink-0 relative">
        {!currentUser ? (
          <Link to="/signin" className="text-decoration-none">
            <button className="flex items-center gap-1 md:gap-2 border border-blue-500 text-blue-500 font-semibold px-2 md:px-4 py-1 md:py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-colors text-xs md:text-base">
              <span className="hidden sm:block">SIGNIN</span>
            </button>
          </Link>
        ) : (
          <>
            <div className="cursor-pointer hover:bg-gray-800 p-1 md:px-3 md:py-1.5 rounded-full transition-colors flex items-center gap-3" onClick={() => setOpenModel(!openModel)}>
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white block md:hidden">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              <div className="hidden md:flex items-center gap-3">
                <img src={currentUser.img || `https://ui-avatars.com/api/?name=${currentUser.username.charAt(0).toUpperCase()}`} alt="profile-pic" className="w-8 h-8 rounded-full object-cover bg-gray-700" />
                <span className="text-white font-medium text-sm">{currentUser.username}</span>
              </div>
            </div>

            {openModel && (
              <div className="absolute top-12 md:top-14 right-0 w-56 md:w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50 flex flex-col text-white">
                <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-4">
                  <img src={currentUser.img || `https://ui-avatars.com/api/?name=${currentUser.username.charAt(0).toUpperCase()}`} alt="profile-pic" className="w-10 h-10 rounded-full object-cover bg-gray-700" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate">{currentUser.username}</span>
                    <span className="text-gray-400 text-sm truncate">@{currentUser.username}</span>
                  </div>
                </div>

                <div className="py-2 border-b border-gray-800">
                  <div 
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-4 transition-colors" 
                    onClick={() => {
                      setIsUploadOpen(true);
                      setOpenModel(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300" fill="currentColor">
                      <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.88v-8.99l-4 1.88V6z" />
                    </svg>
                    <span className="text-sm">Upload Video</span>
                  </div>

                  <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-4 transition-colors mt-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-300">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                    <span className="text-sm">Your channel</span>
                  </div>
                </div>

                <div className="py-2">
                  <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-4 transition-colors" onClick={handleLogOut}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-300">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    <span className="text-sm">Sign out</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};