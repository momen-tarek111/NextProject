"use client"
import ButtonSpinner from "@/components/ButtonSpinner";
import { User } from "@/generated/prisma";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditProfileFormProps{
    user:User
}
const EditProfileForm = ({user}:EditProfileFormProps) => {
    const [username,setUsername]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [loading,setLoading]=useState(false);
    const router=useRouter()
    const fromSubmitHandler= async(e:React.FormEvent)=>{
        e.preventDefault()
        if(username===""){return toast.error("Username is required")}
        if(email===""){return toast.error("Email is required")}
        try {
          setLoading(true)
          await axios.put(`${DOMAIN}/api/users/profile/${user.id}`,{username,email})
          router.replace(`/profile/${user.id}`)
          setLoading(false)
          router.refresh();
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
          setLoading(false)
        }
    }
  return (
    <form onSubmit={fromSubmitHandler} className="flex flex-col">
        <input 
        className="mb-4 border rounded p-2 text-xl" 
        type="text"
        placeholder="Enter Your Username"
        value={username}
        onChange={(c)=>setUsername(c.target.value)}
        />
        <input 
        className="mb-4 border rounded p-2 text-xl" 
        type="email" 
        placeholder="Enter Your Email"
        value={email}
        onChange={(c)=>setEmail(c.target.value)}
        />
        <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
            {loading ? <ButtonSpinner /> : "Edit"}
        </button>
    </form>
  )
}

export default EditProfileForm