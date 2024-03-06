import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import Cookies from "universal-cookie";
// // import Cookies from "cookies";
// import cookie from "cookie-parser";

export const register = (req, res) => {
  // database query
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("user already exits");

    // hash code for encrypting the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("user has been created created");
    });
  });
};

// login page
export const login = (req, res) => {
  // const cookies = new Cookies(req, res);
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("user not found !");

    // now check the password is matched or not
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(404).json("username or password is not correct");
    }

    const token = jwt.sign({ id: data[0].id },"jwtkey");

    // checking if token is send to the server side or not
    console.log("token is :", token);
    // console.log(res.data);

    const { password, ...other } = data[0]; // extracting the password from the data[0] array
    //because we don't wanna show the password to the user or others

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {

  res.clearCookie('access_token',{
    sameSite: "none",
    secure: true,
    httpOnly: true,
  }).status(200).json("User logged out successfully");  
};
  // const cookies = req.cookies


  // if('access_token' in cookies){
  //   res.clearCookie('acc_token', { httpOnly: true, sameSite: 'none', secure: true });
  // }
  // res.status(200).json("User logged out successfully");

