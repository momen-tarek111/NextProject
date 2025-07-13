import ArticlesItem from "@/components/articles/ArticlesItem"
import SearchArticleInput from "@/components/articles/SearchArticleInput"
import Pagination from "@/components/articles/Pagination"
import { Article } from "@/generated/prisma"
import { getArticles, getArticlesCount } from "@/apiCalls/apiArticlesCalls"
import { ARTICLE_PER_PAGE } from "@/utils/constants"
import prisma from "@/utils/db"

// interface ArticlePageProps{
//   searchParams:{pageNumber:string}
// }
const ArticlesPage =async (props:unknown) => {
    const {pageNumber} =await (props as { searchParams: { pageNumber: string } }).searchParams;
  const count:number=await prisma.article.count()
  const articles:Article[]=await getArticles(pageNumber)
  const pages=Math.ceil(count/ARTICLE_PER_PAGE)
  return (
    <section className="fix-height container m-auto px-5">
        <SearchArticleInput/>
        <div className="flex items-center justify-center flex-wrap gap-7">
        {
            articles.map(item=>(
                <ArticlesItem article={item} key={item.id}/>
            ))
        }
        </div>
        <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/articles"/>
    </section>
  )
}

export default ArticlesPage