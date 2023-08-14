"use client"

import { useState } from "react"
import AuthForm from "../AuthForm"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function SignIn() {

  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()

    const superbase = createClientComponentClient()
    const { error } = await superbase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })

    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/verify')
    }

    console.log('user signup', email, password)
  }

  return (
    <main>
      <h2 className="text-center">Sign Up</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && (<div className="error">{error}</div>)}
    </main>
  )
}