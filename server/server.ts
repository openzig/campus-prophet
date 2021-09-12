import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import zhihuRouter from "./routes/zhihu";
import postsRouter from "./routes/posts";
import votesRouter from "./routes/votes";
import commentsRouter from "./routes/comments";
import usersRouter from "./routes/users";

dotenv.config();
const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use(cors());
app.use(express.json());

const uri: string = process.env.ATLAS_URI || "";
console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully.");
  })
  .catch((error) => {
    console.log(`MongoDB database connection failed: ${error}`);
  });

// routes
app.use("/api/v1/zhihu", zhihuRouter);
app.use("/api/v1/post", postsRouter);
app.use("/api/v1/vote", votesRouter);
app.use("/api/v1/comment", commentsRouter);
app.use("/api/v1/user", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
