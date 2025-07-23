"use client"
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { NextResponse } from 'next/server';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
interface DeleteUserButtonProps{
    id:string
}
const DeleteUserButton =({id}:DeleteUserButtonProps) => {
  const router=useRouter()
    const DeleteUserHandler=async ()=>{
        try {
            if(confirm("You Want delete this Account, Are You Sure?")){
                await axios.delete(`${DOMAIN}/api/users/profile/${id}`) as NextResponse
                router.refresh()
            }
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
        }
    }
  return (
    <button onClick={DeleteUserHandler}  className="rounded-lg h-12 lg:px-2 px-1 lg:text-lg text-white bg-red-600 hover:bg-red-900 transition flex items-center gap-2 border-none">
        <RiDeleteBin6Line/> Delete Account
    </button>
  )
}

export default DeleteUserButton