import Link from "next/link";
import Logo from './dojo-logo.png';
import Image from "next/image";
import LogoutButton from "./LogoutButton";

export default function Navbar({user}) {
  return (
    <nav>
        <Image 
          src={Logo} alt='logo' width={70} quality={100} placeholder="blue"
        />
        <h1>Dojo Helpdesk</h1>
        <Link href='/'>Dashboard</Link>
        <Link href='/tickets' className="mr-auto">Tickets</Link>

        {user && <span>Hello, {user.email}</span>}
        <LogoutButton/>
    </nav>
  )
}
