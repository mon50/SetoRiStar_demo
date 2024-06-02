import React from 'react'
import HomeButton from '../button/home/home.button'
import LogoutButton from '../button/logout/logout.button'
import styles from './header.module.css'
import SearchConditionInput from '../input/searchCondition/searchCondition.input'
import SignInSignUpButton from '../button/signin.signup/SignIn.SignUp.button'

const Header = () => {
  return (
    <div className={styles.container}>
        <HomeButton />
        <SearchConditionInput/>
        <SignInSignUpButton/>
        <LogoutButton />
    </div>
  )
}

export default Header