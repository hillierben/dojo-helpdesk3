"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData)

  const superbase = createServerActionClient({cookies})

  const {data: {session}} = await superbase.auth.getSession()

  const {error} = await superbase.from('Tickets')
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
  revalidatePath('/tickets')
  redirect('/tickets')
}