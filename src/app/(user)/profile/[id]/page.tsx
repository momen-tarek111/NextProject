import { DOMAIN } from '@/utils/constants'
import Link from 'next/link'
import { AiFillEdit } from 'react-icons/ai';
import { FaUnlock } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsCalendarDate } from 'react-icons/bs';
import DeleteUserButton from './DeleteUserButton';
import { getUser } from '@/apiCalls/apiArticlesCalls';
import { User } from '@/generated/prisma';
import { cookies } from 'next/headers';

const profile =async (props:unknown) => {
    const { id } =await (props as { params: { id: string } }).params;
    const token = (await cookies()).get("jwtToken")?.value;
    const user:User= await getUser(token||"",id)
    return (
        <section className="fix-height flex justify-center items-center">
            <div className="container p-5 bg-purple-200 rounded shadow row">
                <div className="lg:flex lg:justify-between">
                    <h2 className="lg:text-4xl text-xl lg:text-left text-center text-gray-700 font-bold mb-4">
                        My Profile
                    </h2>
                    <div className="flex lg:gap-10 gap-3">
                        <Link href={`${DOMAIN}/profile/${id}/edit-profile`} className="rounded-lg h-12 lg:px-2 px-1 lg:text-lg text-white bg-green-600 hover:bg-green-900 transition flex items-center gap-2">
                            <AiFillEdit className="text-xl text-center"/> Edit My Profile
                        </Link>
                        <Link href={`${DOMAIN}/profile/${id}/change-password`} className="rounded-lg h-12 lg:px-2 px-1 lg:text-lg text-white bg-blue-600 hover:bg-blue-900 transition flex items-center gap-2">
                            <FaUnlock className="text-xl text-center"/> Change Password
                        </Link>
                        <DeleteUserButton id={id}/>
                    </div>
                </div>
                <div className="mt-8 flex-col ml-8">
                    <div className="flex gap-3 mb-8">
                        <p className="text-gray-600 lg:text-3xl text-lg flex items-center me-2">
                           <FaRegUser className="text-gray-600 lg:text-3xl text-lg me-3"/> UserName  :
                        </p>
                        <p className="lg:text-3xl text-lg text-gray-900 font-semibold">{user?.username}</p>
                    </div>

                    <div className="flex gap-3 mb-8">
                        <p className="text-gray-600 lg:text-3xl text-lg  flex items-center me-2">
                           <HiOutlineMail className="text-gray-600 lg:text-3xl text-lg me-3"/> Email  :
                        </p>
                        <p className="lg:text-3xl text-lg text-gray-900 font-semibold">{user?.email}</p>
                    </div>
                    <div className="flex gap-3 mb-8">
                        <p className="text-gray-600 lg:text-3xl text-lg  flex items-center me-2">
                           <BsCalendarDate className="text-gray-600 lg:text-3xl text-lg me-3"/> Account Created At  :
                        </p>
                        <p className="lg:text-3xl text-lg text-gray-900 font-semibold">{new Date(user?.createAt).toDateString()}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default profile