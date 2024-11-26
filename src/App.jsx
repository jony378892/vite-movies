import { Route, BrowserRouter, Routes } from "react-router-dom";
import { userContext } from "./contextApi";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Details from "./Details";
import Wishlist from "./wishlist";
import SignUp from "./Signup";
import Login from "./Login";

export default function App() {
  const [signUpData, setSignUpData] = useState([]);

  return (
    <BrowserRouter>
      <div>
        <userContext.Provider value={{ signUpData, setSignUpData }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </userContext.Provider>
      </div>
    </BrowserRouter>
  );
}
