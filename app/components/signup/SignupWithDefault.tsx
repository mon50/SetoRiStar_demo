"use client"
import { Button, Input } from '@mui/material';
import supabase from 'utils/supabase/supabaseClient';
import React, { useState } from 'react'

const SignupWithDefault = () => {

    const [email, setEmail] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function signUpNewUser(event: React.FormEvent) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        display_name: displayName,
                    },
                    emailRedirectTo: '/',
                },
            });
            if (error) {
                if (error.message === 'Email rate limit exceeded') {
                    alert('メール送信のレート制限を超えました。しばらくしてからもう一度お試しください。');
                } else {
                    throw error;
                }
            }
            alert("ユーザー登録成功");
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        }
    }

    return (
        <form onSubmit={signUpNewUser}>
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
            <Input
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
            />
            <Button type="submit">登録</Button>
        </form>
    );
};

export default SignupWithDefault;