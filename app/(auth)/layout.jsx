import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function AuthLayout({children}) {

  const superbase = createServerComponentClient({cookies})
  const { data } = await superbase.auth.getSession()

  if (data.session) {
    redirect('/')
  }
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href='/signup'>Sign Up</Link>
        <Link href='/login'>Log in</Link>
      </nav> 
      {children}
    </>
  )
}
