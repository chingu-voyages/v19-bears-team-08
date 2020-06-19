const express = require("express");
const app = express();
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//constants
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;

app.set("views", "./views");
app.set("view engine", "pug");

//middlewares
app.use(express.json());
app.use(
  cors({
    allowedHeaders: "X-Requested-With, Content-Type, Accept, Authorization",
    origin:
      NODE_ENV === "production"
        ? "https://chingudashboard.herokuapp.com"
        : "http://localhost:3000",
  })
);

//load and set base endpoints here
const authRoutes = require("./routes/auth");
app.use("/api/user", authRoutes);

//catches all endpoints that don't exist above
app.use((req, res, next) => next(createError(404, `Invalid URL: ${req.url}`)));

//catches all errors passed through next()
app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Unknown Error";
  res.status(status).json({ message });
});

//DB connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB established"))
  .catch(error => console.log("fucked up" + JSON.stringify(error)));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
