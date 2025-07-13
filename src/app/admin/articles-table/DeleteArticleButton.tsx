"use client"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface DeleteArticleButtonProps{
    articleId:number
}
const DeleteArticleButton = ({articleId}:DeleteArticleButtonProps) => {
    const router=useRouter()
    const deleteArticleHandler=async ()=>{
        try {
            if(confirm("You Want delete this Article, Are You Sure?")){
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`)
                router.refresh()
                toast.success("article deleted")
            }
        } catch (error:any) {
            toast.error(error?.response?.data.message)
            console.log(error)
        }
    }
  return (
    <div onClick={deleteArticleHandler} className="bg-red-600 text-white px-2 py-1 rounded-lg cursor-pointer inline-block text-center mb-2 me-2 lg:me-3 hover:bg-red-800 transition">
        Delete
    </div>
  )
}

export default DeleteArticleButton