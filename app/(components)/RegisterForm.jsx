"use client"
import React, { useState } from 'react'

const RegisterForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            setError("All fields are necessary!")
            return
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username })
            })

            const { user } = await resUserExists.json()

            if (user) {
                setError("User already exists.")
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            })

            if (res.ok) {
                const form = e.target;
                form.reset()
                setError("") 
            } else {
                setError("Registration failed")
            }

        } catch (error) {
            setError("User registration failed")
        }
    }

  return (
    <div>
        <div className='grid place-items-center h-screen border'>
            <div className='shadow-lg p-5 rounded border-t-4 border-blue-500'>
                <h1 className='text-xl font-bold my-4'>Register</h1>

                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input 
                        onChange={e => setUsername(e.target.value)}
                        type='text' 
                        placeholder='Username' 
                    />
                    <input 
                        onChange={e => setPassword(e.target.value)}
                        type='password' 
                        placeholder='Password' 
                    />
                    <button className='bg-blue-500 text-white font-bold cursor-pointer px-6 py-2'>
                        Register
                    </button>

                    {error && <div className='text-red-500 text-sm py-1 px-3 mt-2'>
                        {error}
                    </div>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm