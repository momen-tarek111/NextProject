import { getSingleArtile } from '@/apiCalls/apiArticlesCalls';
import { Article } from '@/generated/prisma';
import EditArticleForm from './EditArticleForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';

const EditArticlePage =async (props:unknown) => {
  const { id } =await (props as { params: { id: string } }).params;
      const token = (await cookies()).get("jwtToken")?.value;
    if(!token) redirect("/")
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin===false) redirect("/")
    const article:Article= await getSingleArtile(id)

  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20 ">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
      <h2 className="text-xl lg:text-2xl text-green-700 font-semibold mb-4">
        Edit Article
      </h2>
      <EditArticleForm article={article}/>
      </div>
    </section>
  )
}

export default EditArticlePage