import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

mongoose
  .connect("mongodb+srv://lee121205:lee121205@cluster0.2xsfvyp.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello"));

app.listen(port, () => console.log("listening on port"));
