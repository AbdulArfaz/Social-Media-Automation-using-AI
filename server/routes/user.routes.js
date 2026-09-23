import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js'


const userRouter = express.Router();

userRouter.get("/test", (req, res) => {
  res.send("user router is working");
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/refreshToken").post(refreshAccessToken)


export default userRouter;