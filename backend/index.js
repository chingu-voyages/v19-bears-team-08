const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// cors

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://chingudashboard.netlify.app", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  next()
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
  // Handle the post for this route
})

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
