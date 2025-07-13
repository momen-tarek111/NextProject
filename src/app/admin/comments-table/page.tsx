import { cookies } from "next/headers"
import { verifyTokenForPage } from "@/utils/verifyToken"
import { redirect } from "next/navigation"
import { getAllComments } from '@/apiCalls/adminApiCalls'
import DeleteCommentButton from "./DeleteCommentButton"

const AdminCommentsTable = async() => {
      const token = (await cookies()).get("jwtToken")?.value;
      if(!token) redirect("/")
      const payload = verifyTokenForPage(token);
      if(payload?.isAdmin===false) redirect("/")
      const comments= await getAllComments(token)
      
  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Comment</th>
            <th className="hidden lg:inline-block">Create At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            comments.map(comment=>(
              <tr key={comment.id} className="border-t-2 border-b-2 border-gray-300">
                <td className="p-3 text-gray-700">{comment.text}</td>
                <td className="hidden lg:inline-block font-normal p-3 text-gray-700">{new Date(comment.createAt).toDateString()}</td>
                <td>
                  <DeleteCommentButton commentId={comment.id}/>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default AdminCommentsTable