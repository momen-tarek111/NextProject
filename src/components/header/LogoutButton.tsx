"use client"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
const LogoutButton = () => {
  const router=useRouter()
  const logoutHandler = async () => {
    try {
        await axios.get(`${DOMAIN}/api/users/logout`);
        router.push("/");
        router.refresh();
    } catch (error) {
        toast.warning("Something went wrong");
        console.log(error);
    }
  }

  return (
    <button onClick={logoutHandler} className="bg-gray-700 p-2 rounded-xl text-gray-200">Logout</button>
  )
}

export default LogoutButton