//Restaurants Data Access Object
import Restaurants from "../models/restaurant.model.js";
import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res) {
    RestaurantsDAO.getRestaurants(req, res);
  }

  static async apiGetRestaurantById(req, res) {
    RestaurantsDAO.getRestaurantByID(req, res);
  }

  static async apiGetRestaurantCuisines(req, res) {
    RestaurantsDAO.getCuisines(req, res);
  }
}
