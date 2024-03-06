import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Register from "./pages/Register";
import Write from "./pages/Write";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";



const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/write",
    element: <Write />,
  },
  {
    path: "/single",
    element: <Single />,
  },
]);


function App() {
  return (
    <div className="container mx-auto px-28">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
