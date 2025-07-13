"use client"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface DeleteCommentButtonProps{
    commentId:number
}
const DeleteCommentButton = ({commentId}:DeleteCommentButtonProps) => {
    const router=useRouter()
    const deleteCommentHandler=async ()=>{
        try {
            if(confirm("You Want delete this Comment, Are You Sure?")){
                await axios.delete(`${DOMAIN}/api/comments/${commentId}`)
                router.refresh()
                toast.success("comment deleted")
            }
        } catch (error:any) {
            toast.error(error?.response?.data.message)
            console.log(error)
        }
    }
  return (
    <div onClick={deleteCommentHandler} className="bg-red-600 text-white px-2 py-1 rounded-lg cursor-pointer inline-block text-center  hover:bg-red-800 transition">
        Delete
    </div>
  )
}

export default DeleteCommentButton