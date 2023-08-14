import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server"
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ticket = await request.json()

  // get superbase instance
  const superbase = createRouteHandlerClient({cookies})

  // get user session data
  const { data: {session}} = await superbase.auth.getSession()

  // insert data into superbase
  const {data, error} = await superbase.from('Tickets')
    .insert({
      ...ticket,
      user_email: session.user.email,
    })
    .select()
    .single()

  return NextResponse.json({data, error})
}