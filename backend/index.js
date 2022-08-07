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
import path from "path";
import { fileURLToPath } from "url";

const unlinkFile = util.promisify(fs.unlink);
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(express.json());
// app.use(cors());

const upload = multer({ dest: "uploads/" });

dotenv.config();
const port = process.env.PORT || 5000;
// arusnac:CzuthqtqGFIWwgSF
mongoose.connect(process.env.PLANT_DB_URI, { useNewUrlParser: true });

app.route("/", () => (req, res) => {});

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  res.send({ imagePath: `/images/${result.Key}` });
});

app.use("/plants", plantRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
