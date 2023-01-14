import React from 'react';
import Navbar from './components/Navbar';
import "./App.css"

import Home from './components/screens/Home';
import AllRoutes from './components/AllRoutes';

function App() {
  return (
    <>
      <Navbar/>
      <AllRoutes/>
    </>
    
  );
}

export default App;
