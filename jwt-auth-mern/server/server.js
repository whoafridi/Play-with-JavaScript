const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j9yy4.mongodb.net/myFirstDatabase`;
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
