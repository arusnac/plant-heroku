import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import plantRouter from "./routes/plants.js";
import userRouter from "./routes/users.js";
import multer from "multer";
import fs from "fs";
import util from "util";
import { uploadFile, getFileStream } from "./s3.js";

const unlinkFile = util.promisify(fs.unlink);

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

dotenv.config();
const port = process.env.PORT || 5000;
// arusnac:CzuthqtqGFIWwgSF
mongoose.connect(process.env.PLANT_DB_URI, { useNewUrlParser: true });

app.route("/", () => (req, res) => {
  console.log("hello");
});

app.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  // console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  // console.log(result);
  //const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
});

app.use("/plants", plantRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
