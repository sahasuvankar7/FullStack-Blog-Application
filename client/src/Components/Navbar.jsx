import React, { useContext } from "react";
import Logo from "../image/blog_icon.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center h-24 ">
      <div className="mx-6">
        <Link to="/">
          <img src={Logo} alt="_blank" className="w-14" />
        </Link>
      </div>
      <div className="flex items-center justify-center flex-row space-x-5 font-medium text-lg">
        <Link to="/?cat=art">
          <h6>Art</h6>
        </Link>
        <Link to="/?cat=science">
          <h6>Science</h6>
        </Link>
        <Link to="/?cat=technology">
          <h6>Technology</h6>
        </Link>
        <Link to="/?cat=cinema">
          <h6>Cinema</h6>
        </Link>
        <Link to="/?cat=design">
          <h6>Design</h6>
        </Link>

        <Link to="/?cat=food">
          <h6>Food</h6>
        </Link>
        <span className="text-sm font-normal">{currentUser?.username}</span>
        {currentUser ? (
          <button
            className="text-base bg-slate-200 px-5 py-2 rounded-md font-semibold"
            onClick={logout}
          >
          logout
          </button>
        ) : (
          <Link to="/login">
            <button className="text-base bg-slate-200 px-5 py-2 rounded-md font-semibold">
              Login
            </button>
          </Link>
        )}

        <span className="text-sm font-normal w-[50px] h-[50px] rounded-full bg-green-200 flex justify-center items-center hover:bg-green-50 hover:broder-2 hover:border-rose-500 transition">
          <Link to="/write">Write</Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
