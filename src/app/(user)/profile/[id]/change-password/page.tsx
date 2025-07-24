import { getUser } from '@/apiCalls/apiArticlesCalls';
import { User } from '@/generated/prisma';
import { cookies } from 'next/headers';
import React from 'react'
import ChangePasswordForm from './ChangePasswordForm';

const changePassword = async (props: unknown) => {
  const { id } = await (props as { params: { id: string } }).params;
  const token = (await cookies()).get("jwtToken")?.value;
  const user: User = await getUser(token || "", id)
  // console.log({user})
  return (
    <section className="fix-height m-auto px-4 container flex justify-center items-center">
      <div className="m-auto bg-white p-5 rounded-lg w-full  md:w-2/3">
        <h1 className="text-3xl font-bold mb-5 text-gray-500">Change My Passowrd</h1>
        <ChangePasswordForm user={user}/>
      </div>
    </section>
  )
}
export default changePassword