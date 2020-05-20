const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//import routes
const authRoute = require("./routes/auth");

const PORT = process.env.PORT || 4000;

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database!")
);

//Middlewears
app.use(express.json());

//route middlewears
app.use("/api/user", authRoute);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
