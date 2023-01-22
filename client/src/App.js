import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import Menu from './Components/Menu/Menu';
import Cart from './Components/Cart/Cart';


function App() {
  return (
    <>

      <Routes>

        {/* {<Route path="/" element={<Login />} /> */}
        {/* {<Route path="/" element={<Registration/>} /> */}
        //{<Route path="/" element={<Cart/>} />
          // <Route path="auth" element={}/>
          // <Route path="register" element={}/>
          // <Route path="admin_panel" element={}/> 
        }
      </Routes>
    </>
  );
}

export default App;
