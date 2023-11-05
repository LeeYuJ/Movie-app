import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import User from "./models/User.js";
import config from "./config/key.js";
import { auth } from "./middleware/auth.js";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello World"));

app.get("/api/hello", (req, res) => res.send("안녕"));

app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);

  await user
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 확인
  User.findOne({ email: req.body.email })
    .then((user) => {
      // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

        // 비밀번호까지 맞다면 토큰 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => {
      return res.json({
        loginSuccess: false,
      });
    });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => res.status(200).send({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.listen(port, () => console.log("listening on port"));
