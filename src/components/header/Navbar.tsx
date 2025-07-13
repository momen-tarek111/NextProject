"use client";
import Link from "next/link"
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css"
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
interface NavbarProps{
    isAdmin:boolean
}
const Navbar = ({isAdmin}:NavbarProps) => {
    const [toggle,setToggle]=useState(false);
  return (
    <nav className={styles.navbar}>
            <div>
                <Link href="/" className={styles.logo}>
                Cloud
                <GrTechnology/>
                Hosting
                </Link>
            </div>
            <div className={styles.menu}>
                {toggle ?(<IoMdClose onClick={()=>setToggle(prev=>!prev)}/>):(<AiOutlineMenu onClick={()=>setToggle(prev=>!prev)}/>)}
            </div>
            <div className={styles.navLinksWrapper}
                style={{
                    clipPath: toggle &&"polygon(0 0, 100% 0, 100% 100%, 0 100%)"||""
                }
                }
            >
                <ul className={styles.navLinks}>
                    <Link className={styles.navLink} href="/" onClick={()=>setToggle(false)}>Home</Link>
                    <Link className={styles.navLink} href="/articles?pageNumber=1"onClick={()=>setToggle(false)}>Articles</Link>
                    <Link className={styles.navLink} href="/about"onClick={()=>setToggle(false)}>About</Link>
                    {
                        isAdmin&&(<Link className={styles.navLink} href="/admin"onClick={()=>setToggle(false)}>Admin DashBoard</Link>)
                    }
                </ul>
            </div>
        </nav>
  )
}

export default Navbar