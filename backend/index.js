const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//constants
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;

app.set("views", "./views");
app.set("view engine", "pug");

//middlewares
app.use(express.static("public"));
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

//load all the routes here
require("./routes")(app);

//DB connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB established"))
  .catch(error => console.log("fucked up" + JSON.stringify(error)));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
