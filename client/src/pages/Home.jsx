import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";


// const posts1 = [
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

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search// it basically provide the path of the url
  // like this one ?cat=art
   console.log(cat);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData();
  }, [cat]);

  const handleText = (html) => {
     const doc = new DOMParser().parseFromString(html, 'text/html');
     return doc.body.textContent;
  }
  return (
    <div>
      <div className="mt-20 flex flex-col gap-36">
        {posts.map((post,index) => (
          <div
            key={post.id}
            className={`flex ${index % 2 !== 0 ? "" : "flex-row-reverse"}`}
          >
            <div className="flex-1 relative">
              <div className="img w-11/12 h-full overflow-hidden">
                {/* Set a fixed height, adjust as needed */}
                <img
                  src={`../upload/${post.img}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="after-content"></div>
            </div>
            <div className="flex-1 mx-4 px-10 flex flex-col justify-between">
              <Link to={`/post/${post.id}`}>
                <h1 className="text-5xl font-semibold">{post.title}</h1>
              </Link>
              <p className="text-lg">{handleText(post.desc)}</p>
              <div className=" max-w-screen-xl">
                <button className="outline-none border-2 rounded-md py-2 px-3 bg-white text-teal-500 border-teal-500 hover:border-white hover:bg-[#b9e7e7] hover:text-black text-base font-medium">
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
