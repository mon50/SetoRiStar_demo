import React from 'react'
import HomeButton from '../button/home/home.button'
import LogoutButton from '../button/logout/logout.button'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.container}>
        <HomeButton />
        <LogoutButton />
    </div>
  )
}

export default Header