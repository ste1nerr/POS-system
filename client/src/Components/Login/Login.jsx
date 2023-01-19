import React from 'react'
import styles from './Login.module.scss'

const Login = () => {
  return (
    <>
      <div className='container'>
        <p className={styles.title}>Login</p>

        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Nickname</p>
          <input placeholder="Enter a nickname..." className={styles.input_nickname} type="text" />
        </div>

        
        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Password</p>
          <input placeholder="Enter a password..." className={styles.input_password} type="password" />
        </div>

        <a role="button" href= "#" className={styles.login_btn}>Sign In</a>

      </div>

    </>
  )
}

export default Login