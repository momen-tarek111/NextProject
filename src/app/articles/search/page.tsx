import { getArticlesBasedOnSearchText } from "@/apiCalls/apiArticlesCalls"
import ArticlesItem from "@/components/articles/ArticlesItem"
import { Article } from "@/generated/prisma"

interface SearchArticlePageProps{
    searchParams:Promise<{ searchText: string }>
}
const ArticlesSearchPage =async ({ searchParams }: SearchArticlePageProps) => {
    const { searchText } = await searchParams; // ✅ await the Promise
  const articles:Article[]=await getArticlesBasedOnSearchText(searchText)

  return (
    <section className="fix-height container m-auto px-5 ">
      {
        articles.length===0?(
        <h2 className="text-2xl text-gray-800 font-bold p-5">
          Articles based on
          <span className='text-red-500 mx-1'>{searchText}</span>
          not found
        </h2>):(<>
          <h1 className="text-2xl font-bold mb-2 mt-7 text-gray-800">
            Articles based on
            <span className='ms-1 text-green-700 text-3xl font-bold'>{searchText}</span>
          </h1>
          <div className='flex items-center justify-center flex-wrap gap-7'>
            {articles.map(item => (
              <ArticlesItem key={item.id} article={item} />
            ))}
          </div>
        </>
        )      
      }
    </section>
  )
}

export default ArticlesSearchPage