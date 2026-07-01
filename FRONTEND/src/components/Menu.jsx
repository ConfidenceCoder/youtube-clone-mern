import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className={`
        fixed md:static top-14 md:top-0 left-0 h-[calc(100vh-56px)] md:h-full bg-gray-900 
        transition-all duration-200 ease-in-out z-50 overflow-y-auto hide-scrollbar border-r border-gray-800
        ${isMenuOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}
      `}>
        <div className="p-2 flex flex-col gap-1">
          
          <Link to="/" className={`flex items-center py-2.5 px-3 hover:bg-gray-800 rounded-lg text-white text-decoration-none ${!isMenuOpen && 'md:justify-center md:flex-col md:py-4'}`}>
            <span className="text-xl">🏠</span>
            <span className={`${!isMenuOpen ? 'md:text-[10px] md:mt-1' : 'ml-4 text-sm font-medium'}`}>Home</span>
          </Link>

          <div className={`flex items-center py-2.5 px-3 hover:bg-gray-800 rounded-lg cursor-pointer ${!isMenuOpen && 'md:justify-center md:flex-col md:py-4'}`}>
            <span className="text-xl">🔥</span>
            <span className={`${!isMenuOpen ? 'md:text-[10px] md:mt-1' : 'ml-4 text-sm font-medium'}`}>Trending</span>
          </div>

          <div className={`flex items-center py-2.5 px-3 hover:bg-gray-800 rounded-lg cursor-pointer ${!isMenuOpen && 'md:justify-center md:flex-col md:py-4'}`}>
            <span className="text-xl">📺</span>
            <span className={`${!isMenuOpen ? 'md:text-[10px] md:mt-1' : 'ml-4 text-sm font-medium'}`}>Subs</span>
          </div>

          {isMenuOpen && (
            <>
              <hr className="border-gray-800 my-3" />
              {!currentUser && (
                <div className="px-4 py-2">
                  <p className="text-sm text-gray-400 mb-3 leading-tight">Sign in to like videos, comment, and subscribe.</p>
                  <Link to="/signin" className="text-decoration-none">
                    <button className="border border-blue-500 text-blue-500 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                      SIGN IN
                    </button>
                  </Link>
                </div>
              )}
              {currentUser && <hr className="border-gray-800 my-3" />}
              
              <div className="flex items-center py-2.5 px-3 hover:bg-gray-800 rounded-lg cursor-pointer">
                <span className="text-xl">📚</span>
                <span className="ml-4 text-sm font-medium">Library</span>
              </div>
              <div className="flex items-center py-2.5 px-3 hover:bg-gray-800 rounded-lg cursor-pointer">
                <span className="text-xl">⏱️</span>
                <span className="ml-4 text-sm font-medium">History</span>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
};