import React, { createContext, useReducer } from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import AllRoutes from './components/AllRoutes';
import {reducer,initialState} from './reducers/userReducer';


export const UserContext = createContext();

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <>
    <UserContext.Provider value={{state,dispatch}} >
      <Navbar/>
      <AllRoutes/>
    </UserContext.Provider>
      
    </>
    
  );
}

export default App;
