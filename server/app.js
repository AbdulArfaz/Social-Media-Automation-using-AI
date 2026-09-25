import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import socialAuthRouter from "./routes/socialAuth.routes.js";
import accountRouter from "./routes/account.routes.js";
import postRouter from "./routes/post.routes.js";
import activityRouter from "./routes/activity.routes.js";
import { initScheduler } from "./services/scheduler.services.js";

const app = express();

app.use(cors({
    origin: 'https://social-media-automation-using-ai.onrender.com',
    credentials: true
})
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/oauth", socialAuthRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/posts", postRouter)
app.use('/api/activity', activityRouter)

initScheduler()

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode !== 401) {
    console.log(err)
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  });
});


export { app };