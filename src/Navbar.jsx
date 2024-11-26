import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-col bg-[#051925] py-3 gap-2 border-b border-gray-700/20">
      <div className="flex px-2 justify-between sm:justify-normal items-center">
        <div className="flex gap-4 w-full items-center">
          <Link
            to="/"
            className="px-8 py-0.5 bg-amber-500 text-white text-base sm:text-lg rounded font-semibold cursor-pointer">
            Movie
          </Link>
          <div className="relative border border-gray-200  rounded-md grow hidden sm:inline-flex w-full ">
            <input
              type="text"
              placeholder="Search movies or categories"
              className="py-0.5 sm:py-1 text-sm sm:text-base text-gray-700 rounded-md grow pl-2 focus:outline-none  "
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute bg-amber-500   text-white cursor-pointer right-0  px-3 py-2 rounded-r-lg"
            />
          </div>
        </div>
        <div className="flex self-end divide-x gap-2 divide-gray-100/40 text-white items-center w-[200px] mb-1 sm:mr-2">
          <Link to="/wishlist" className="ml-3 cursor-pointer">
            Wishlist
          </Link>
          <Link to="/login" className="pl-2 sm:pl-4 cursor-pointer">
            Login
          </Link>
        </div>
      </div>
      <div className="flex gap-2 sm:hidden items-center mx-2">
        <div className="relative border border-gray-200  rounded-md grow sm:hidden inline-flex w-full">
          <input
            type="text"
            placeholder="Search movies or categories"
            className="py-0.5 sm:py-1 test-sm sm:text-base text-gray-700 rounded-md grow pl-2 focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute bg-amber-500   text-white cursor-pointer right-0  px-3 py-1.5 rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
}
