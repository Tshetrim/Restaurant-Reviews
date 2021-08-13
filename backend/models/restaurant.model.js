import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  address: { type: String },
  borough: { type: Array },
  cuisine: { type: String },
  grades: { type: Array },
  name: { type: String },
});
const Restaurants = mongoose.model(
  "Restaurants",
  restaurantSchema,
  "restaurants"
);

export default Restaurants;
