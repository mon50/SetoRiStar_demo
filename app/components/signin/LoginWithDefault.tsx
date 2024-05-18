"use client";
import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import LoginHook from '@/lib/features/signin/LoginHook';
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
        } catch (error) {
            alert(error.message);
        }
    }
      
    // const signIn = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         alert("サインイン成功");
    //     } catch (error) {
    //         alert(error.message);
    //     }

    //     try {
    //         const {data,error} = await supabase.storage.from('users').download(`${displayImage}`);
    //         if (error) {
    //           throw error
    //         }
    //         setDisplayImage(URL.createObjectURL(data));
    //     } catch (error) {
    //         alert('Error downloading image: ' + error.message)
    //     }

    //     try {
    //         const { error: uploadError } = await supabase.from('users').upsert({
    //             email,
    //             password,
    //             display_name: displayName,
    //             display_image: displayImage,
    //         });
    //         if (uploadError) {
    //             throw uploadError;
    //         }
    //     } catch (error) {
    //         alert('Error uploading data: ' + error.message);
    //     }
    // };

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