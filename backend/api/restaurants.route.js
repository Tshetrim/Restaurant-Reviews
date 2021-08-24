import express from "express";
import RestaurantsController from "./restaurantsController.js";
import Restaurants from "../models/restaurant.model.js";

const router = express.Router();

//establishing router for homepage
router.route("/").get(RestaurantsController.apiGetRestaurants);

export default router;
