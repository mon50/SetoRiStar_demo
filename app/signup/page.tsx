import { Link } from '@mui/material'
import React from 'react'
import SignupWithDefault from '../components/signup/SignupWithDefault'

const signupPage = () => {
  return (
    <>
    <SignupWithDefault/>
    <Link href="/signin">ログイン</Link>
    </>  
  )
}

export default signupPage