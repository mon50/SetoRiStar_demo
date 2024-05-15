import { Button, Input } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import React, { useState } from 'react';
import LoginHook from '@/lib/features/signin/LoginHook';

const LoginWithDefault = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("サインイン成功");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
            <form onSubmit={signIn}>
                <Input 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <Button type="submit">Emailでログイン</Button>
            </form>
    );
};

export default LoginWithDefault;