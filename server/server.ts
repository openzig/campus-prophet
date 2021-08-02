import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

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


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});