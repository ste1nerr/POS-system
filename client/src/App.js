import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Components/Login/Login';


function App() {
  return (
    <>

      <Routes>

        {<Route path="/" element={<Login />} />
          // <Route path="auth" element={}/>
          // <Route path="register" element={}/>
          // <Route path="admin_panel" element={}/> 
        }
      </Routes>
    </>
  );
}

export default App;
