import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
//confgurng dotenv
dotenv.config();

//import RD from "./api/restaurantsDAO.js";
import Restaurants from "./models/restaurant.model.js";

//configuring mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 50, // Maintain up to 10 socket connections
  //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  useFindAndModify: false,
};
//conneting to mongoose and if sucessful, spinning up server on port
mongoose.connect(process.env.RESTAURANTS_DB_URI, options, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to mongod server");

    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  }
});

//establshing port at process.env.PORT or 3000 as default
const port = process.env.PORT || 3000;
