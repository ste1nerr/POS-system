import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import styles from './Registration.module.scss'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [fullname, setName] = useState('');
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');


  async function RegisterUser(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register',
        {
          email,
          password,
          fullname,
          adminPassword
        });
      alert('registartion successfull')
    } catch (e) {
      alert('registartion failed')
    }
  };
  return (
    <>
      <div className='container'>
        <p className={styles.title}>Registration</p>



        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Email</p>
          <input placeholder="Enter your email..."
            className={styles.input_email}
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)} />
        </div>


        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Nickname</p>
          <input placeholder="Enter a nickname..."
            className={styles.input_nickname}
            type="text"
            value={fullname}
            onChange={event => setName(event.target.value)} />

        </div>


        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Password</p>
          <input placeholder="Enter a password..."
            className={styles.input_password}
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)} />
        </div>




        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Admin Password</p>
          <input placeholder="Enter a password..."
            className={styles.input_admin_password}
            type="password"
            value={adminPassword}
            onChange={event => setAdminPassword(event.target.value)} />
        </div>
        <a
          onClick={RegisterUser}
          role="button"
          href="#"
          className={styles.registration_btn}>Sign Up</a>

      </div>

    </>
  )
}

export default Registration