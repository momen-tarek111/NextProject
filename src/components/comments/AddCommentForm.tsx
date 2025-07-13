'use client'
import React,{ useState } from "react"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
interface AddCommentProps{
  articleId:number
}
const AddCommentForm = ({articleId}:AddCommentProps) => {
    const [text,setText]=useState("");
    const router=useRouter()
    const fromSubmitHandler=async(e:React.FormEvent)=>{
        e.preventDefault()
        if(text===""){return toast.error("Please Write Something")}
        try {
          await axios.post(`${DOMAIN}/api/comments`,{text,articleId})
          router.refresh()
          setText("")
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
        }
    }
  return (
    <form onSubmit={fromSubmitHandler}>
        <input 
        className="w-full p-3 rounded text-xl border-none text-gray-900" 
        type="text" 
        placeholder="Add Comment......."
        value={text}
        onChange={(c)=>setText(c.target.value)}
        />
        <button type="submit" className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition">
            Comment
        </button>
    </form>
  )
}

export default AddCommentForm