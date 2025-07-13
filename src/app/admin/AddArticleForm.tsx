'use client'
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useState } from "react"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
const AddArticleForm = () => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const router=useRouter()
    const fromSubmitHandler=async (e:React.FormEvent)=>{
        e.preventDefault()
        if(title===""){return toast.error("Title is required")}
        if(description===""){return toast.error("Description is required")}
        try {
          await axios.post(`${DOMAIN}/api/articles`,{title,description})
          toast.success("article added")
          setTitle("")
          setDescription("")
          router.refresh()
        } catch (error:any) {
          toast.error(error?.response?.data.message);
          console.log(error);
        }
    }
  return (
    <form onSubmit={fromSubmitHandler} className="flex flex-col">
        <input 
        className="mb-4 border rounded p-2 text-xl" 
        type="text" 
        placeholder="Enter Article Title"
        value={title}
        onChange={(c)=>setTitle(c.target.value)}
        />
        <textarea 
        className="mb-4 resize-none rounded p-2 lg:text-xl" 
        rows={5} 
        placeholder="Enter Article Description"
        value={description}
        onChange={(c)=>setDescription(c.target.value)}
        />
        <button type="submit" className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold">
            Add
        </button>
    </form>
  )
}

export default AddArticleForm