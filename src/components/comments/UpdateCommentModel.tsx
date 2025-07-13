"use client"
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import axios from 'axios'
import { DOMAIN } from "@/utils/constants";
import { toast } from 'react-toastify';

interface UpdateCommentModelProps{
    setOpen:Dispatch<SetStateAction<boolean>>
    text:string
    commentId:number
}
const UpdateCommentModel = async({setOpen,text,commentId}:UpdateCommentModelProps) => {
    const [updatedText,setUpdatedText]=useState(text)
    const router =useRouter()

    const fromSubmitHandler=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(text===""){return toast.info("Please Write Something")}
        try {
          await axios.put(`${DOMAIN}/api/comments`,{text:updatedText})

          router.refresh()
          setUpdatedText("")
          setOpen(false)
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
        }
    } 
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex justify-center items-center">
        <div className='bg-white w-2/4 rounded-lg p-3'>
            <div className='flex justify-end items-start mb-5'>
                <IoMdCloseCircleOutline onClick={()=>setOpen(false)} className="text-red-500 cursor-pointer text-3xl"/>
            </div>
            <form onSubmit={fromSubmitHandler}>
                <input
                type="text"
                placeholder="Edit Comment....."
                className="bg-white mb-2 w-full py-2 text-xl rounded-lg"
                value={updatedText}
                onChange={(e)=>setUpdatedText(e.target.value)}
                />
                <button type="submit" className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition">Edit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateCommentModel