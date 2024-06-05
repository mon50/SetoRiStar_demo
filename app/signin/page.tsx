import React from 'react'
import { login, signup } from '@/app/signin/action';
import { Button, FormControl, Input } from '@mui/material';

const LoginPage = () => {
  

    return (
      <div className="App">
        <h2 >新規作成 or ログイン</h2>
        <FormControl> 
          <label htmlFor="email">Email:</label>
          <Input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <Input id="password" name="password" type="password" required />
          <Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button>
        </FormControl>
      </div>
    );
}

export default LoginPage