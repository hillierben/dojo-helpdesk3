import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {notFound} from 'next/navigation';
import { cookies } from 'next/headers';

// components
import DeleteButton from './DeleteButton';

export const dynamicParams = true;

export async function generateMetadata({params}) {
  const superbase = createServerComponentClient({cookies})

  const {data: ticket} = await superbase.from('Tickets')
    .select()
    .eq('id', params.id)
    .single()

  return {
    title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not found'} `
  }
}

async function getTicket(id) {

  // imitate delayed loading
  // await new Promise(resolve => setTimeout(resolve, 3000))
  const superbase = createServerComponentClient({cookies})

  const {data} = await superbase.from('Tickets')
    .select()
    .eq('id', id)
    .single()


  if (!data) {
    notFound()
  }

  return data
}

export default async function TicketDetails({params}) {
  const ticket = await getTicket(params.id);

  const superbase = createServerComponentClient({cookies})
  const {data} = await superbase.auth.getSession()

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className='ml-auto'>
          {data.session.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id}/>
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>

  )
}
