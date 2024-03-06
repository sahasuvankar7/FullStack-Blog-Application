import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [ error , setError ] = useState(null);
  console.log(inputs);


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
      const res = await axios.post("http://localhost:8800/api/auth/register", inputs);
      console.log(res.data)
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
   
    }
  };

  return (
    <div className="auth flex flex-col justify-center items-center min-h-screen bg-[#b9e7e7]">
      <h1 className="text-2xl md:text-4xl font-bold mb-10">Register</h1>
      <form
        action="submit"
        className="flex flex-col  p-5  bg-white w-10/12 rounded-lg h-fit shadow-md "
      >
        <input
          required
          type="text"
          placeholder="Username"
          className="my-2 p-3 bg-slate-200 text-black rounded-lg mt-8"
          name="username"
          onChange={handleOnChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="bg-slate-200 text-black p-3 rounded-lg my-2"
          name="email"
          onChange={handleOnChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="bg-slate-200 text-black p-3 rounded-lg my-2"
          name="password"
          onChange={handleOnChange}
        />
        <div className="flex justify-center flex-col items-center">
          <button
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-xl w-2/4 font-semibold mb-4"
            onClick={handleSubmit}
          >
            Register
          </button>
         {error && <p className="text-red-500">{error}</p>} 
          <span>
            Don't have an account <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
