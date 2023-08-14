import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function DELETE(_, {params}) {
  const id = params.id

  const superbase = createRouteHandlerClient({cookies})

  const {error} = await superbase.from('Tickets')
    .delete()
    .eq('id', id)

  return NextResponse.json({error})
}

