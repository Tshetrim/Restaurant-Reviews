import mongoose from "mongoose";
import { reviewSchema } from "../models/reviews.model.js";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  address: { type: String },
  borough: { type: Array },
  cuisine: { type: String },
  grades: { type: Array },
  name: { type: String, text: true },
  restaurant_id: { type: String },
  //reviews: [{ reviewSchema }],
});

const Restaurants = mongoose.model(
  "Restaurants",
  restaurantSchema,
  "restaurants"
);

export default Restaurants;
