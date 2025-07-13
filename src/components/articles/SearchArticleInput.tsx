'use client'
import React,{ useState } from "react"
import { useRouter } from "next/navigation";
const SearchArticleInput = () => {
    const [searchText,setSearchText]=useState("");
    const router=useRouter();
    const fromSubmitHandler=(e:React.FormEvent)=>{
        e.preventDefault()
        
        router.push(`/articles/search?searchText=${searchText}`)

    }
  return (
    <form onSubmit={fromSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
        <input 
        className="w-full p-3 rounded text-xl border-none text-gray-900" 
        type="search" 
        placeholder="Enter Article Title"
        value={searchText}
        onChange={(c)=>setSearchText(c.target.value)}
        />
        
        
    </form>
  )
}

export default SearchArticleInput