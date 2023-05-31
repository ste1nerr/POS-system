import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import styles from './AdminLogin.module.scss';
import axios from 'axios';




const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/admin', {
        email: user.email,
        adminPassword: adminPassword
      });
      setUser(response.data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  };
  
  if (redirect) {
    return <Navigate to="/admin" />; // Redirect to the admin panel
  } else if (!user) {
    return <Navigate to="/previous-page" />; // Redirect to the previous page
  }


  return (
    <>
      <div className='container'>
        <p className={styles.title}>Login</p>

        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Password</p>
          <input
            placeholder="Enter a password..."
            className={styles.input_password}
            type="password"
            value={adminPassword}
            onChange={(event) => setAdminPassword(event.target.value)}
          />
        </div>

        <a onClick={handleLoginSubmit} role="button" href="#" className={styles.login_btn}>
          Sign In
        </a>
      </div>
    </>
  );
};

export default AdminLogin;