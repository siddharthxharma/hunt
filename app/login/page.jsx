import React from 'react'
import LoginForm from '../(components)/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Navbar from '../(components)/Navbar'

const Login = async () => {

  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard")

  return (
    <div>
        <Navbar />
        <LoginForm />
    </div>
  )
}

export default Login