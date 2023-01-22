import React from 'react'
import styles from './Registration.module.scss'

const Registration = () => {
  return (
    <>
      <div className='container'>
        <p className={styles.title}>Registration</p>

        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Nickname</p>
          <input placeholder="Enter a nickname..." className={styles.input_nickname} type="text" />
        </div>

        
        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Password</p>
          <input placeholder="Enter a password..." className={styles.input_password} type="password" />
        </div>

        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Email</p>
          <input placeholder="Enter your email..." className={styles.input_email} type="text" />
        </div>


        <div className={styles.input_card}>
          <p className={styles.input_card_title}>Admin Password</p>
          <input placeholder="Enter a password..." className={styles.input_admin_password} type="password" />
        </div>
        <a role="button" href= "#" className={styles.registration_btn}>Sign Up</a>

      </div>

    </>
  )
}

export default Registration