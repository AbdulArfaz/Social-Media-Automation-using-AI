import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.get("/test", (req, res) => {
  res.send("user router is working");
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


export default userRouter;