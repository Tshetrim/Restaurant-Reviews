//Reviews Data Access Object
import { ObjectId } from "mongodb";
import Review from "../models/reviews.model.js";
//import RestaurantsDAO from "./restaurantsDAO.js";

export default class ReviewsDAO {
  static async addReview(req, res) {
    const restaurantId = req.body.restaurant_id;
    const review = req.body.review;
    const userInfo = {
      name: req.body.name,
      _id: req.body.user_id,
    };
    const date = new Date();

    const reviewDoc = new Review({
      restaurantID: restaurantId,
      review: review,
      userInfo: userInfo,
      date: date,
    });

    reviewDoc.save((err, savedDoc) => {
      if (err) {
        res.json("unable to post review: " + error);
      } else {
        //RestaurantsDAO.addRestaurantReview(restaurantId, savedDoc);
        res.json({ status: "Sucessfully Saved" });
      }
    });
  }

  static async updateReview(req, res) {
    const reviewId = req.body.review_id;
    const text = req.body.text;
    const userId = req.body.user_id;
    const date = new Date();

    Review.updateOne(
      { "userInfo._id": userId, _id: ObjectId(reviewId) },
      { $set: { review: text, date: date } },
      (err) => {
        if (err) console.log(err);
        else {
          res.json("Successfuly Updated");
        }
      }
    );
  }

  static async deleteReview(req, res) {
    const reviewId = req.query.id;
    const userId = req.body.user_id;

    Review.deleteOne({ "userInfo._id": userId, _id: ObjectId(reviewId) }).exec(
      (err) => {
        if (err) res.json("Error in Deleting", err);
        else res.json("Sucessfuly deleted review");
      }
    );
  }
}
