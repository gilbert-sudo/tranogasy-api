require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//connect to the database
const connectDB = require("./config/dbconnect");
connectDB();
//development environnement
console.log(process.env.DEV);
const PORT = process.env.PORT || 3600;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/", require("./routes/roots"));
app.use('/properties', require('./routes/propertyRoutes'))

//run and log the connection
mongoose.connection.once("open", () => {
  console.log("connected to mongo DB");
  app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
