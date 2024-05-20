import React from 'react'
import LoginWithDefault from '../components/signin/LoginWithDefault';
import { Link } from '@mui/material';

const LoginPage = () => {

    return (
      <div className="App">
        <LoginWithDefault/>
        <Link href="/signup">新規作成</Link>
      </div>
    );
}

export default LoginPage