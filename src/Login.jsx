import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext, loginStatusContext } from "./contextApi";

export default function Login() {
  const { signUpData } = useContext(userContext);
  const [loginData, setLoginData] = useState({});
  const [loginNotification, setLoginNotification] = useState(false);
  const { setLoginStatus } = useContext(loginStatusContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const user = signUpData.find((x) => x.email === loginData.email);

    if (!user) {
      console.log(`${loginData.email} isn't registered`);
    } else {
      if (user.password === loginData.password) {
        console.log("Login successful");
        setLoginStatus("true");
        setLoginNotification(true);
        setTimeout(() => {
          setLoginNotification(false);
          navigate("/");
        }, 1200);
      } else {
        console.log("Incorrect password");
      }
    }
  }

  function handleForm(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((loginData) => ({ ...loginData, [name]: value }));
  }

  return (
    <>
      <div className="relative h-fit sm:h-svh w-screen sm:bg-gray-100 flex justify-center sm:pt-16">
        {loginNotification && (
          <p className="absolute top-10 bg-green-500 rounded-full text-white px-7 py-0.5 z-10 text-sm font-medium shadow-lg">
            Login successful
          </p>
        )}

        <form
          className="max-w-2xl flex flex-col gap-3 rounded-2xl px-5 sm:px-10 md:px-20 md:mx-24 lg:px-20 py-8 sm:border sm:shadow-lg mx-auto bg-white h-fit"
          onSubmit={handleSubmit}>
          <p className="text-2xl text-center font-medium mb-3">Sign In</p>
          <div className="flex-col flex gap-2">
            <label className="font-normal text-sm sm:text-base"> Email</label>
            <input
              type="text"
              placeholder="exanple@email.com"
              className="border border-gray-400 rounded-md px-2 text-sm py-1 sm:text-base text-gray-700"
              required
              name="email"
              onChange={handleForm}
            />
          </div>
          <div className="flex-col flex gap-2">
            <label className="font-normal text-sm sm:text-base">Password</label>
            <input
              type="text"
              placeholder="12345"
              className="border border-gray-400 rounded-md px-2 text-sm py-1 sm:text-base text-gray-700"
              required
              name="password"
              onChange={handleForm}
            />
          </div>
          <button className="bg-amber-500 text-white text-sm sm:text-base font-bold rounded-md self-start text-nowrap w-full px-14 py-1.5 mt-4">
            Sign In
          </button>
          <div className="relative pt-5 pb-4">
            <hr className="border-gray-500" />
            <p className="absolute mx-auto inset-x-0 inline-flex w-fit bg-white px-6 top-3">Or</p>
          </div>
          <div className="text-sm -base mx-auto  py-1.5">
            Don&apos;t have an account ?
            <Link to="/signUp" className="ml-2 underline hover:text-amber-600 cursor-pointer">
              Create an account
            </Link>
          </div>
          <p className="text-xs text-gray-600 text-center">
            By signing in, you agree to <span className="text-blue-600">MoviesInfo&apos;s Conditions of Use</span> and{" "}
            <span className="text-blue-600">Privacy Policy.</span>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
