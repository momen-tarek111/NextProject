'use client'
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useState } from "react"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Article } from "@/generated/prisma";
interface EditArticleFormProps{
    article:Article
}
const EditArticleForm = ({article}:EditArticleFormProps) => {
    const [title,setTitle]=useState(article.title);
    const [description,setDescription]=useState(article.description);
    const router=useRouter()
    const fromSubmitHandler=async (e:React.FormEvent)=>{
        e.preventDefault()
        if(title===""){return toast.error("Title is required")}
        if(description===""){return toast.error("Description is required")}
        try {
          await axios.put(`${DOMAIN}/api/articles/${article.id}`,{title,description})
          
          toast.success("article updated")
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
        value={title}
        onChange={(c)=>setTitle(c.target.value)}
        />
        <textarea 
        className="mb-4 resize-none rounded p-2 lg:text-xl" 
        rows={5} 
        
        value={description}
        onChange={(c)=>setDescription(c.target.value)}
        />
        <button type="submit" className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold">
            Edit
        </button>
    </form>
  )
}

export default EditArticleForm