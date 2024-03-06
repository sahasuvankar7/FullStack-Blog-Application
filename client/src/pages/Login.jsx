import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  console.log(inputs);

  const { login } = useContext(AuthContext);
  // if user resgistered successfully then redirect to login page
  // if user already registered then show error message
  const navigate = useNavigate();

  // creating function for taking the user inputted data
  const handleOnChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      // console.log(res);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="auth flex flex-col justify-center items-center min-h-screen bg-[#b9e7e7]">
      <h1 className="text-2xl md:text-4xl font-bold mb-10">Login</h1>
      <form
        action="submit"
        className="flex flex-col  p-4  bg-white w-10/12 rounded-lg h-fit shadow-md "
      >
        <input
          required
          type="text"
          placeholder="username"
          className="my-5 p-3 bg-slate-200 text-black rounded-lg mt-8"
          name="username"
          onChange={handleOnChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          className="bg-slate-200 text-black p-3 rounded-lg"
          name="password"
          onChange={handleOnChange}
        />
        <div className="flex justify-center flex-col items-center">
          <button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-xl w-2/4 font-semibold mb-4"
            onClick={handleSubmit}
          >
            Login
          </button>
          {error && <p className="text-red-500">{error.response.data}</p>}
          <span>
            Don't have an account <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
