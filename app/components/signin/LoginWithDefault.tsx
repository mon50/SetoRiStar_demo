"use client";
import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import supabase from '../../../lib/supabaseClient';

const LoginWithDefault = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function signInWithEmail(event: React.FormEvent) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
            });
            if (error) {
              throw error;
            }
            alert("サインイン成功");
            // ログイン成功後、usersテーブルからユーザー情報を取得
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('auth_id, display_image, display_name,user_id')
              .eq('email', email)
              .single();
            if (userError) {
              throw userError;
            };
            // ログイン後のリダイレクト処理を追加
            // router.push('/main');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        }
    }

    return (
        <form onSubmit={signInWithEmail}>
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