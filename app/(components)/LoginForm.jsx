"use client";

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            // Save username and password to localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            router.replace("dashboard");
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <div className='grid place-items-center h-screen border'>
                <div className='shadow-lg p-5 rounded border-t-4 border-blue-500'>
                    <h1 className='text-xl font-bold my-4'>Enter the details</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <button className='bg-blue-500 text-white font-bold cursor-pointer px-6 py-2'>
                            Login
                        </button>
                        {error && <div className='text-red-500 text-sm py-1 px-3 mt-2'>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;