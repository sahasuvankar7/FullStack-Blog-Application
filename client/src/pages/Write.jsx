import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [title, setTitle] = useState(state?.desc || "");
  // console.log(value);


  const navigate = useNavigate(); // to navigate to the home page

  const upload = async () => {
    try {
      const formdata = new FormData(); // to send any key pair value in file to server
      formdata.append("file", file);
      // making request to server for post
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formdata,
        { withCredentials: true }
      ); // withCredentials is used to send cookie to server
      // return res.data.imgUrl;
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); // taking the image url from server
    try {
      state
        ? await axios.put(
            `http://localhost:8800/api/posts/${state.id} `,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            "http://localhost:8800/api/posts/",
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write mt-[20px] flex gap-[20px]">
      <div className="content flex flex-col gap-5">
        <input
          type="text"
          placeholder="Title"
          className="p-3 border-2 border-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editContainer h-72 overflow-scroll border-2 border-gray-200">
          <ReactQuill
            className="editor h-full border-none"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu flex flex-col gap-20px ">
        <div className="item border-2 border-grya-300 flex flex-col justify-between text-sm text-[#555] p-3 ">
          <h1 className="text-md">publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visisbility: </b> public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="underline pointer" htmlFor="file">
            {" "}
            upload Image
          </label>
          <div className="buttons flex justify-between">
            <button className="pointer text-teal-500 bg-white px-3 py-2 border rounded-md border-teal-500 ">
              Save as a draft
            </button>
            <button
              className="pointer text-white bg-teal-500 px-4 py-2 rounded-md text-sm border border-teal-500 "
              onClick={handleClick}
            >
              publish
            </button>
          </div>
        </div>
        <div className="item border-2 border-grya-300 flex flex-col justify-between p-3 text-sm text-[#555] ">
          <h1>catergory</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              checked={cat === "art"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              checked={cat === "science"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              checked={cat === "cinema"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              checked={cat === "technology"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">tecnology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              checked={cat === "design"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              checked={cat === "food"}
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
