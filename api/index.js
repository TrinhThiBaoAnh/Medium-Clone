const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const tagRoute = require("./routes/tags");
const memberRoute = require("./routes/members");

console.log('process.env.MONGO_URL',process.env.MONGO_URL);
mongoose.set('useFindAndModify', false);
dotenv.config({ path: 'ENV_FILENAME' });
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
process.env.MONGO_URL = "mongodb://localhost:27017/MediumDB"
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpg");
    // let ext = file.originalname.split(".");
    // ext = ext[ext.length - 1];
    // cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);
app.use("/api/tags", tagRoute);
app.use("/api/members", memberRoute);


app.listen(5000, () => {
  console.log("Backend is running.");
});
