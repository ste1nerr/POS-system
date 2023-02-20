import React, { FormEvent, useContext, useRef, useState } from 'react'
import styles from './Login.module.scss'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
const Login = () => {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password});
      setUser(response.data)
      alert('login successful')
      setRedirect(true)

      setRedirect(true)
    } catch (e) {
      alert('login failed')
    }
  };
  if(redirect){
    return <Navigate to= {'/profile'}/>
  }

  return (
    <>
      <div className='container'>
        <p className={styles.title}>Login</p>
        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Nickname</p>
          <input placeholder="Enter a nickname..."
            className={styles.input_nickname}
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </div>


        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Password</p>
          <input placeholder="Enter a password..."
            className={styles.input_password}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </div>

        <a
          onClick={handleLoginSubmit}
          role="button" href="#"
          className={styles.login_btn}>Sign In</a>

      </div>

    </>
  )
}
export default Login