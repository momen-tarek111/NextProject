import { getUser } from "@/apiCalls/apiArticlesCalls";
import EditProfileForm from "./EditProfileForm"
import { cookies } from "next/headers";
import { User } from "@/generated/prisma";

const EditProfile =async (props:unknown) => {
    const { id } =await (props as { params: { id: string } }).params;
    const token = (await cookies()).get("jwtToken")?.value;
    const user:User= await getUser(token||"",id)
    
    return (
        <section className="fix-height m-auto px-4 container flex justify-center items-center">
        <div className="m-auto bg-white p-5 rounded-lg w-full  md:w-2/3">
            <h1 className="text-3xl font-bold mb-5 text-gray-500">Edit My Account</h1>
            <EditProfileForm user={user}/>
        </div>
        </section>
    )
}

export default EditProfile