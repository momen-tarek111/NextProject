import Pagination from "@/components/articles/Pagination"
import { Article } from "@/generated/prisma"
import { getArticles } from "@/apiCalls/apiArticlesCalls"
import { ARTICLE_PER_PAGE } from "@/utils/constants"
import Link from 'next/link'
import DeleteArticleButton from './DeleteArticleButton'
import prisma from '@/utils/db'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { verifyTokenForPage } from "@/utils/verifyToken"
// interface AdminArticleTableProps{
//   searchParams:{ pageNumber: string }
// }
const AdminArticlesTable =async (props:unknown) => {
    const {pageNumber} =await (props as { searchParams: { pageNumber: string } }).searchParams;
    const token = (await cookies()).get("jwtToken")?.value;
    if(!token) redirect("/")
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin===false) redirect("/")
    const articles:Article[]=await getArticles(pageNumber)
    const count:number= await prisma.article.count()
    const pages=Math.ceil(count/ARTICLE_PER_PAGE)

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block">Create At</th>
            <th>Actions</th>
            <th className="p-1 lg:p-2"></th>
          </tr>
        </thead>
        <tbody>
          {
            articles.map(article=>(
              <tr key={article.id} className="border-t-2 border-b-2 border-gray-300">
                <td className="p-3 text-gray-700">{article.title}</td>
                <td className="hidden lg:inline-block font-normal p-3 text-gray-700">{new Date(article.createAt).toDateString()}</td>
                <td className="p-3">
                  <Link href={`/admin/articles-table/edit/${article.id}`} className="bg-green-600 text-white cursor-pointer px-2 py-1 rounded-lg inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition">
                  Edit
                  </Link>
                  <DeleteArticleButton articleId={article.id}/>
                </td>
                <td className="hidden lg:flex lg:items-center p-3 ">
                  <Link
                    href={`/articles/${article.id}`}
                    className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800" 
                  >
                    Read More
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/admin/articles-table"/>
    </section>
  )
}

export default AdminArticlesTable