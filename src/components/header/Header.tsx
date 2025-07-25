import Link from "next/link"
import styles from "./header.module.css"
import Navbar from "./Navbar"
import { cookies } from "next/headers"
import { verifyTokenForPage } from "@/utils/verifyToken"
import LogoutButton from './LogoutButton';
import { DOMAIN } from "@/utils/constants"
const Header =async () => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
        <Navbar isAdmin={payload?.isAdmin||false}/>
        <div className={styles.right}>
            {payload ? (
              <>
                <Link href={`${DOMAIN}/profile/${payload.id}`} className="text-blue-800 md:text-xl capitalize font-bold">{payload?.username}</Link>
                 <LogoutButton />
              </>
              ) : (
              <>            
                <Link className={styles.btn} href="/login">Login</Link>
                <Link className={styles.btn} href="/register">Register</Link>
              </>
              )
            }
        </div>
    </header>
  )
}

export default Header

