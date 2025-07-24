"use client"
import ButtonSpinner from "@/components/ButtonSpinner";
import { User } from "@/generated/prisma"
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface EditProfileFormProps {
  user: User
}
const ChangePasswordForm = ({ user }: EditProfileFormProps) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const fromSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(newPassword)
    if (password === "") { return toast.error("Password is required") }
    if (newPassword === "") { return toast.error("New Password is required") }
    if (confirmNewPassword === "") { return toast.error("Confirm New Password is required") }
    if (newPassword===password){return toast.error("New Password must be different from the old password")}
    if (newPassword!==confirmNewPassword){return toast.error("The new password must be similar to confirm the new password.")}
    const passwordIsMatch =await bcrypt.compare(password,user.password)
    if(!passwordIsMatch){
      return toast.error("The old password not true.")
    }
    try {
      setLoading(true)
      await axios.put(`${DOMAIN}/api/users/profile/${user.id}/change-password`,{ newPassword })
      router.replace("/login")
      setLoading(false)
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <form onSubmit={fromSubmitHandler} className="flex flex-col">
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Enter Old Password"
        onChange={(c) => setPassword(c.target.value)}
      />
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Enter New Password"
        onChange={(c) => setNewPassword(c.target.value)}
      />
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="password"
        placeholder="Enter Confirm New Password"
        onChange={(c) => setConfirmNewPassword(c.target.value)}
      />
      <button disabled={loading} type="submit" className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold">
        {loading ? <ButtonSpinner /> : "Change"}
      </button>
    </form>
  )
}

export default ChangePasswordForm