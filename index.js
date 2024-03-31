import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import {
  addWord,
  getMe,
  login,
  register,
} from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import { createReport } from "./controllers/ReportController.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:pass1234@cluster0.ecvdwuu.mongodb.net/easyword?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is ok"))
  .catch((err) => console.log("DB error:", err));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post("/report", checkAuth, createReport);

app.post("/addTranslation", checkAuth, addWord);

app.get("/user/me", checkAuth, getMe);
// app.get("/users", );
app.post("/log", login);
app.post("/reg", register);

app.listen("4444", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
