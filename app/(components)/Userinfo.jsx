"use client"

import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Userinfo = () => {

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') {
        console.log('Session is loading...');
        } else {
        console.log('Session data:', session);
        }
    }, [status, session]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

  return (
    <div className='grid place-items-center p-12'>
        <div className='shadow-lg p-8 flex flex-col gap-2 my-6'>
            <div>
                Name: <span className='font-bold px-4'>{session?.user?.username}</span>
            </div>
            <div>
                Level: <span className='font-bold px-4'>{session?.user?.level}</span>
            </div>
            <div>
                Role: <span className='font-bold px-4'>{session?.user?.role}</span>
            </div>
            <button 
                className='bg-red-400 text-white font-bold px-6 py-2 mt-3 rounded'
                onClick={() => signOut()}
            >
                Logout
            </button>
        </div>
    </div>
  )
}

export default Userinfo