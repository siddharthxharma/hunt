import React from 'react'
import CreateQuestion from '../(components)/CreateQuestion'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const AddQuestion = async () => {

  const session = await getServerSession(authOptions)
  if (session?.user.role != 'admin') redirect("/dashboard")

  return (
    <div>
        <CreateQuestion></CreateQuestion>
    </div>
  )
}

export default AddQuestion;