import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URLS } from '../config/api';
import { logout } from '../redux/useSlice';

export const NavBar = ({ toggleMenu,setIsUploadOpen }) => {
  const [openModel, setOpenModel] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const handleLogOut = async () => {

    try {
      await axios.post(`${API_URLS.AUTH}/logout`, {}, { withCredentials: true })
      dispatch(logout());
      setOpenModel(false);
      navigate('/signin')

    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div className="bg-gray-900 h-14 md:h-16 flex items-center justify-between px-4 z-50 sticky top-0">

      <div className="flex items-center gap-4 w-1/4">
        <button
          onClick={toggleMenu}
          className="text-white text-xl hover:bg-gray-800 p-2 rounded-full outline-none"
        >
          ☰
        </button>
        <Link to="/" className="text-white text-xl font-semibold tracking-tighter hidden sm:flex items-center gap-1 text-decoration-none">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-red-600"
            fill="currentColor"
          >
            <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z" />
          </svg>
          YouTube
        </Link>
      </div>

      <div className="w-1/2 flex justify-center">
        <div className="flex items-center w-full max-w-[550px] bg-gray-900 rounded-full border border-gray-700 overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-white px-5 py-1.5 md:py-2 text-sm"
          />
          <button className="bg-gray-800 px-4 md:px-5 py-1.5 md:py-2 border-l border-gray-700 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>
      </div>

      <div className="w-1/4 flex justify-end relative">
        {!currentUser ? (
          <Link to="/signin" className="text-decoration-none">
            <button className="flex items-center gap-2 border border-blue-500 text-blue-500 font-semibold px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              SIGNIN
            </button>
          </Link>
        ) : (
          <>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="text-white hover:bg-gray-800 p-2 rounded-full transition-colors mr-2"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.88v-8.99l-4 1.88V6z" />
              </svg>
            </button>
            <div
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 px-3 py-1.5 rounded-full transition-colors"
              onClick={() => setOpenModel(!openModel)}
            >
              <img
                src={currentUser.img || `https://ui-avatars.com/api/?name=${currentUser.username.charAt(0).toUpperCase()}`}
                alt="profile-pic"
                className="w-8 h-8 rounded-full object-cover bg-gray-700"
              />
              <span className="text-white font-medium text-sm">
                {currentUser.username}
              </span>
            </div>

            {openModel && (
              <div className="absolute top-14 right-0 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50 flex flex-col text-white">
                <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-4">
                  <img
                    src={currentUser.img || `https://ui-avatars.com/api/?name=${currentUser.username.charAt(0).toUpperCase()}`}
                    alt="profile-pic"
                    className="w-10 h-10 rounded-full object-cover bg-gray-700"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium truncate">{currentUser.username}</span>
                    <span className="text-gray-400 text-sm truncate">@{currentUser.username}</span>
                  </div>
                </div>

                <div className="py-2 border-b border-gray-800">
                  <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center gap-4 transition-colors">
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