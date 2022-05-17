//Restaurants Data Access Object
import Restaurants from "../models/restaurant.model.js";
import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res) {
    RestaurantsDAO.getRestaurants(req, res);
    console.log("sent restaurants");
  }

  static async apiGetRestaurantById(req, res) {
    RestaurantsDAO.getRestaurantByID(req, res);
    console.log("sent restaurant by ID");
  }

  static async apiGetRestaurantCuisines(req, res) {
    RestaurantsDAO.getCuisines(req, res);
    console.log("sent cuisines");
  }
}
