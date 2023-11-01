import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb+srv://lee121205:lee121205@cluster0.2xsfvyp.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello World"));

app.post("/register", async (req, res) => {
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

app.listen(port, () => console.log("listening on port"));
