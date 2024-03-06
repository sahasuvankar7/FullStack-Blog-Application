import express from "express";
// import {db} from './db.js'
import cors from "cors";
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload') // destination - where to find the file(image)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname) // generating unique file(image) id
  }
})
const upload = multer({ storage})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.listen(8800, () => {
  console.log("all connected");
});

