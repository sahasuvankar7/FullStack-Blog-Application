import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  // now we just want to get the post with the id
  const q =
    "SELECT p.id ,`username` , `title`, p.img, u.img AS userImg ,`desc`,`title`,`cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(token + "this is token");
  if (!token) return res.status(401).json("you are not authenticated");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    console.log("this is userinfo:", userInfo);
    if (err) return res.status(403).json("token is not valid");

    const q =
      "INSERT INTO posts(`title`,`desc`, `img`, `cat`,`date`,`uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("success has been created");
    });
  });
};

// delete post
export const deletePost = (req, res) => {
  // checking the token is valid or not

  const token = req.cookies.access_token;
  console.log(token + "this is token");
  if (!token) return res.status(401).json("you are not authenticated");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    console.log("this is userinfo:", userInfo);
    if (err) return res.status(403).json("token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND  `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("you are delete only your post");
      return res.json("post has been deleted");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(token + "this is token");
  if (!token) return res.status(401).json("you are not authenticated");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    console.log("this is userinfo:", userInfo);
    if (err) return res.status(403).json("token is not valid");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?";
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("post has been updated");
    });
  });
};
