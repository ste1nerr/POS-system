import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Menu from './Components/Menu/Menu';
import { useState } from 'react';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';

axios.defaults.withCredentials = true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/profile" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/registration" element={<Registration />} />

      </Routes>
      </UserContextProvider>
  );
}

export default App;
