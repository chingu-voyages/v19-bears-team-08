const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Constants
const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(
  cors({
    allowedHeaders: "X-Requested-With, Content-Type, Accept, Authorization",
    origin: [
      "https://chingudashboard.netlify.app",
      "http://localhost:3000",
      "mongodb+srv://Snow",
    ],
  })
);

//DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB established"))
  .catch(error => console.log("fucked up" + JSON.stringify(error)));

//Routes
const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
