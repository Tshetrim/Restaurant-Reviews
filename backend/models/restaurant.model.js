import mongoose from "mongoose";
import { reviewSchema } from "../models/reviews.model.js";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  address: {
    building: { type: String },
    coord: { type: Array },
    street: { type: String },
    zipcode: { type: String },
  },
  borough: { type: Array },
  cuisine: { type: String },
  grades: { type: Array },
  name: { type: String, text: true },
  restaurant_id: { type: String },
  reviews: [{ type: reviewSchema }], //embedding with reviewSchema 
});

const Restaurants = mongoose.model(
  "Restaurants",
  restaurantSchema,
  "restaurants"
);

export default Restaurants;
