import React, { useState } from 'react';
import { Menu, NavBar,Upload } from './components/index';
import { AllRoutes } from './router/AllRoutes';


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);


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

      {isUploadOpen && <Upload 
      setIsUploadOpen={setIsUploadOpen}
      setRefreshTrigger={setRefreshTrigger}
       />}
      
    </div>
  );
}

export default App;