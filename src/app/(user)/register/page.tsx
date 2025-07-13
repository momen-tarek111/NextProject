import RegisterForm from "./RegisterForm"

const RegisterPage = () => {
  return (
    <section className="fix-height m-auto px-4 container flex justify-center items-center">
      <div className="m-auto bg-white p-5 rounded-lg w-full  md:w-2/3">
        <h1 className="text-3xl font-bold mb-5 text-gray-500">Create New Account</h1>
        <RegisterForm/>
      </div>
    </section>
  )
}

export default RegisterPage