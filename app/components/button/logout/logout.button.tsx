"use client";
import React from 'react'
import styles from './logout.button.module.css'
import { logout } from './action';

const LogoutButton = () => {
  return (
        <button className={`${styles.button} ${styles.horizontal}`} onClick={logout}>Logout</button>
  )
}

export default LogoutButton