import React from 'react'
import { Route,Routes } from 'react-router-dom';
import { SignIn,Home,Video } from '../pages/index';

interface AllRoutesProps {
  refreshTrigger: boolean;
}

export const AllRoutes: React.FC<AllRoutesProps> = ({ refreshTrigger }) => {
  return (
    <div>
        <Routes>
            <Route path='/'>
                <Route index element={<Home refreshTrigger={refreshTrigger} />} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/video/:id' element={<div><Video/></div>} />
            </Route>
        </Routes>
    </div>
  )
}
