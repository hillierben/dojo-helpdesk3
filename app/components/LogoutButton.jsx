"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const superbase = createClientComponentClient()
    const { error } = await superbase.auth.signOut()

    if(!error) {
      router.push('/login')
    }
    if (error) {
      console.log(error)
    }
  }
  
  return (
    <button className="btn-primary" onClick={handleLogout}>
      Logout
    </button>
  )
}
