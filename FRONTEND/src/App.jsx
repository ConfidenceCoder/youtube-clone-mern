import React, { useState } from 'react';
import { Menu, NavBar } from './components/index';
import { AllRoutes } from './router/AllRoutes';
import { Upload } from './components/Upload'; 

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">

      <NavBar 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        setIsUploadOpen={setIsUploadOpen} 
      />

      <div className="flex flex-1 overflow-hidden">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="flex-1 overflow-y-auto bg-[#0f0f0f] relative">
          <AllRoutes refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {isUploadOpen && <Upload setIsUploadOpen={setIsUploadOpen} />}
      
    </div>
  );
}

export default App;