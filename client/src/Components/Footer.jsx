import React from "react";
import Logo from "../image/blog_update_icon.png";

const Footer = () => {
  return (
    <footer className="flex flex-row items-center justify-between w-full bg-green-100 p-4 mx-3 my-10">
      <img src={Logo} alt="_blank" className="w-16" />
      <span>
        Made with &#x2764; and <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
