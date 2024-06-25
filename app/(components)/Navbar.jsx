import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-center gap-4 py-10'>
        <Link href={'/'} className='px-12'>Home</Link>
        <Link href={'/leaderboard'} className='px-12'>Leaderboard</Link>
        <Link href={'/play'} className='px-12'>Play</Link>
        <Link href={'/login'} className='px-12'>Login</Link>
    </div>
  )
}

export default Navbar