import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const reviewSchema = new Schema({
  restaurantID: { type: String },
  review: { type: String },
  userInfo: {
    name: { type: String },
    _id: { type: String },
  },
  date: { type: Date },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
