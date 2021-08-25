import express from "express";
import RestaurantsController from "./restaurantsController.js";
import ReviewsController from "./reviewsController.js";

const router = express.Router();

//establishing router for homepage
router.route("/").get(RestaurantsController.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
