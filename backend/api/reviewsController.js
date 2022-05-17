//Reviews Data Access Object
import ReviewsDAO from "../dao/reviewsDAO.js";
import Review from "../models/reviews.model.js";
//import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res) {
    ReviewsDAO.addReview(req, res);
  }

  static async apiUpdateReview(req, res) {
    ReviewsDAO.updateReview(req, res);
  }
  
  static async apiDeleteReview(req, res) {
    ReviewsDAO.deleteReview(req, res);
  }
}
