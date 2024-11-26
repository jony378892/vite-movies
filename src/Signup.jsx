import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./contextApi";

export default function SignUp() {
  const { signUpData, setSignUpData } = useContext(userContext);
  const [formData, setFormData] = useState({});

  function handleSignUpData(e) {
    e.preventDefault();
    const validate = signUpData.find((x) => x.email === formData.email);
    if (!validate) {
      setSignUpData((prevData) => [...prevData, formData]);
      console.log("Collected Data:", [...signUpData, formData]);
      setFormData({});
    } else {
      console.log(`${formData.email} is already registered`);
    }
    setFormData({});
  }

  function handleForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div className="h-fit sm:h-svh w-screen sm:bg-gray-100 flex justify-center sm:pt-10">
      <form
        className="max-w-2xl flex flex-col gap-3 rounded-2xl px-5 sm:px-10 md:px-20 md:mx-24 lg:px-20 py-8 sm:border sm:shadow-lg mx-auto bg-white h-fit"
        onSubmit={handleSignUpData}>
        <p className="text-xl font-medium text-center mb-3">Sign Up</p>
        <div className="flex-col flex gap-2">
          <label className="font-normal text-sm sm:text-base">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="border border-gray-400 rounded-md px-2 py-1 text-sm sm:text-base placeholder:text-gray-700"
            name="name"
            value={formData.name || ""}
            required
            onChange={handleForm}
          />
        </div>
        <div className="flex-col flex gap-2">
          <label className="font-normal text-sm sm:text-base"> Email</label>
          <input
            type="text"
            placeholder="example@email.com"
            className="border border-gray-400 rounded-md px-2 py-1 text-sm sm:text-base placeholder:text-gray-700"
            name="email"
            value={formData.email || ""}
            required
            onChange={handleForm}
          />
        </div>
        <div className="flex-col flex gap-2">
          <label className="font-normal text-sm sm:text-base">Role</label>
          <select
            className="bg-white border border-gray-400 py-1.5 px-2 rounded-md text-sm sm:text-base"
            name="role"
            value={formData.role || ""}
            required
            onChange={handleForm}>
            <option className="text-gray-600" value="">
              Select
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex-col flex gap-2">
          <label className="font-normal text-sm sm:text-base">Password</label>
          <input
            type="password"
            placeholder="1234"
            className="border border-gray-400 rounded-md px-2 py-1 text-sm sm:text-base placeholder:text-gray-700"
            name="password"
            value={formData.password || ""}
            required
            onChange={handleForm}
          />
        </div>
        <button className="bg-amber-500 text-white text-sm sm:text-base font-bold rounded-md self-start text-nowrap w-full px-14 py-1.5 mt-4 disabled:cursor-not-allowed">
          Sign Up
        </button>
        <div className="relative pt-5 pb-3">
          <hr className="border-gray-500" />
          <p className="absolute mx-auto inset-x-0 inline-flex w-fit bg-white px-6 top-3">Or</p>
        </div>
        <p className="text-sm font-formal mx-auto py-1.5">
          Already have an account?{" "}
          <Link to="/login" className="sm:ml-2 underline hover:text-amber-600 underline-offset-2 cursor-pointer">
            Login now
          </Link>
        </p>
        <p className="text-xs text-gray-600 text-center">
          By signing up, you agree to <span className="text-blue-600">Movies&apos;s Conditions of Use</span> and{" "}
          <span className="text-blue-600">Privacy Policy.</span>{" "}
        </p>
      </form>
    </div>
  );
}
