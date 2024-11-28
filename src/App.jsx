import { Route, BrowserRouter, Routes } from "react-router-dom";
import { loginStatusContext, userContext, searchContext, moviesContext } from "./contextApi";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Details from "./Details";
import Wishlist from "./wishlist";
import SignUp from "./Signup";
import Login from "./Login";
import User from "./user";
import { movies as initialMovies } from "./data";

export default function App() {
  const [signUpData, setSignUpData] = useState([]);
  const [search, setSearch] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [movies, setMovies] = useState(initialMovies);

  return (
    <BrowserRouter>
      <div>
        <moviesContext.Provider value={{ movies, setMovies }}>
          <searchContext.Provider value={{ search, setSearch }}>
            <userContext.Provider value={{ signUpData, setSignUpData }}>
              <loginStatusContext.Provider value={{ loginStatus, setLoginStatus }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/details/:id/:title" element={<Details />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/user" element={<User />} />
                </Routes>
              </loginStatusContext.Provider>
            </userContext.Provider>
          </searchContext.Provider>
        </moviesContext.Provider>
      </div>
    </BrowserRouter>
  );
}
