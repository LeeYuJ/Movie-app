import express from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb+srv://lee121205:lee121205@cluster0.2xsfvyp.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello"));

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log("listening on port"));
