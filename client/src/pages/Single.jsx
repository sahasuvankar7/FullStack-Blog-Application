import React, { useState, useEffect, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCloudySnowing, MdDelete } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Menu from "../Components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Single = () => {
  const [post, setPost] = useState({});
  // to get the current path location of the url
  const location = useLocation();

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  // try to split the url to get the post id for example : localhost:5173/post/1 --> it will split them 0 , 1 , 2 part . show here we want the last of part of it which is 2 ( as id)
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(res.data);
        console.log(res.data + "this is single post");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  // console.log(post.img);

  const handleDelete = async () => {
    // console.log("hello");
    try {
      const data = await axios.delete(
        `http://localhost:8800/api/posts/${postId}`,
        {withCredentials: true}
      );
console.log(data+" data is here")
      // after logout navigate to home page
      navigate("/");
      console.log(res.data + "this is single post");
    } catch (err) {
      console.log(err);
    }
  };

  const handleText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
 }
  return (
    <div className="single flex gap-12">
      <div className="content flex flex-col gap-[20px] flex-grow-5 w-9/12">
        <img
          src={`../upload/${post.img}`}
          alt="_blank"
          className="w-full h-[300px] object-cover mt-10"
        />
        <div className="user flex items-center gap-[10px] text-[14px]">
          {post.userImg && (
            <img
              src={post.userImg}
              alt="_blank"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {/* here we are checking if the currentuser is equal to post user ( who made the post) the button should show up otherwise not */}
          {currentUser?.username === post.username && (
            <div className="edit flex gap-[5px]">
              <Link to={`/write?edit=2`} state={post}>
                <FaEdit className="w-[20px] h-[20px]" />
              </Link>
              <MdDelete
                onClick={handleDelete}
                className="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
          )}
        </div>
        <h1 className="text-4xl font-semibold text-[#333]">{post.title}</h1>
        <p className="text-justify leading-7">{handleText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
