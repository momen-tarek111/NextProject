import Link from "next/link"


const NotFoundPage = () => {
  return(
    <section className="flex fix-height justify-center items-center flex-col">
        <h1 className="text-gray-800 text-7xl font-bold">404</h1>
        <p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>
        <Link className="text-xl underline text-blue-700" href="/" > Go to home page</Link>
    </section>
  )
}

export default NotFoundPage