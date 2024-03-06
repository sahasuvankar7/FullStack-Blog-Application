import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// const posts = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor sit amet",
//     link: "https://media.gettyimages.com/id/1170959362/photo/monaco-monaco-cristiano-ronaldo-of-juventus-lionel-messi-of-fc-barcelona-and-virgil-van-dijk.jpg?s=612x612&w=0&k=20&c=Dqj8uo_h2feqEAa6z0RMFsozgT_nPzxlbmbsu5iPZ90=",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus debitis porro dolore est, laborum suscipit voluptatum esse voluptatem id sunt qui ipsa perspiciatis deserunt sit consequuntur placeat ex! Maiores, in?",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet",
//     link: "https://wallpapers.com/images/hd/messi-pictures-jzykf84saw6wbkd6.jpg",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus debitis porro dolore est, laborum suscipit voluptatum esse voluptatem id sunt qui ipsa perspiciatis deserunt sit consequuntur placeat ex! Maiores, in?",
//   },
//   {
//     id: 3,
//     title: "Lorem ipsum dolor sit amet",
//     link: "https://media.gettyimages.com/id/1495846940/photo/paris-france-lionel-messi-of-paris-saint-germain-during-the-ligue-1-match-between-paris-saint.jpg?s=612x612&w=0&k=20&c=KRaTAibRfoMfpudj0yNQJTrkIM78ZxZQt7uCTQvSFjk=",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus debitis porro dolore est, laborum suscipit voluptatum esse voluptatem id sunt qui ipsa perspiciatis deserunt sit consequuntur placeat ex! Maiores, in?",
//   },
// ];
const Menu = ({cat}) => {

  const [posts, setPosts] = useState([]);
  // const cat = useLocation().search// it basically provide the path of the url
  // like this one ?cat=art
  //  console.log(cat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPosts(res.data);
        // console.log(res.data);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  return (
    <div className="menu flex-grow-2 flex flex-col gap-[25px]">
      <h1 className="text-[20px] text-[#555]">you may like other posts</h1>
      {posts.map((post) => (
        <div className="post flex flex-col gap-[10px]" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" 
          className="w-full h-[200px] object-cover"
          />
          <h2 className="text-[20px] text-[#555] font-semibold">{post.title}</h2>
          <button className="w-1/2 outline-none border-2 rounded-md py-2 px-3 bg-white text-teal-500 border-teal-500 hover:border-white hover:bg-[#b9e7e7] hover:text-black text-base font-medium">Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;

